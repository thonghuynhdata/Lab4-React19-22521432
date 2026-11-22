import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {randomUUID} from 'node:crypto';
const app=express();app.use(cors({origin:'http://localhost:5173'}));app.use(express.json({limit:'20kb'}));
const supported=new Set(['nasa','esports-tribunal','notNasa']);
const seeded=[{id:randomUUID(),forum:'nasa',author:'Mission Control',text:'Welcome to the NASA discussion channel.',timestamp:new Date().toISOString()},{id:randomUUID(),forum:'esports-tribunal',author:'Moderator',text:'Fair-play evidence review is open.',timestamp:new Date().toISOString()},{id:randomUUID(),forum:'notNasa',author:'Community',text:'Welcome to the general conversation.',timestamp:new Date().toISOString()}];
let memory=[...seeded];let mongoReady=false;
const messageSchema=new mongoose.Schema({id:{type:String,required:true,unique:true},forum:{type:String,required:true,index:true},author:{type:String,required:true,maxlength:60},text:{type:String,required:true,maxlength:1000},timestamp:{type:Date,default:Date.now}},{versionKey:false});
const Message=mongoose.model('Message',messageSchema);
const validateForum=(req,res,next)=>supported.has(req.params.forum)?next():res.status(404).json({error:'Unknown forum'});
async function getMessages(req,res){try{const result=mongoReady?await Message.find({forum:req.params.forum}).sort({timestamp:1}).lean():memory.filter(m=>m.forum===req.params.forum);res.json(result);}catch(err){console.error(err);res.status(500).json({error:'Database read failed'});}}
async function addMessage(req,res){const {author,text}=req.body??{};if(typeof author!=='string'||typeof text!=='string'||!author.trim()||!text.trim()||author.trim().length>60||text.trim().length>1000)return res.status(400).json({error:'Provide author (1–60 chars) and text (1–1000 chars)'});
 const msg={id:randomUUID(),forum:req.params.forum,author:author.trim(),text:text.trim(),timestamp:new Date().toISOString()};try{if(mongoReady)await Message.create(msg);else memory.push(msg);res.status(201).json(msg);}catch(err){console.error(err);res.status(500).json({error:'Database write failed'});}}
app.get('/api/health',(_req,res)=>res.json({status:'ok',persistence:mongoReady?'mongodb':'memory-demo'}));
app.get('/api/messages/:forum',validateForum,getMessages);app.post('/api/messages/:forum',validateForum,addMessage);
// Alias supports slide 26 example naming, while slide 27 uses /api/messages/:forum.
app.get('/api/forums/:forum/messages',validateForum,getMessages);app.post('/api/forums/:forum/messages',validateForum,addMessage);
const PORT=Number(process.env.PORT)||4000;
async function start(){if(process.env.MONGODB_URI){try{await mongoose.connect(process.env.MONGODB_URI);mongoReady=true;console.log('MongoDB 8 persistence connected');}catch(error){console.error('MongoDB connection failed:',error.message);process.exit(1);}}else console.log('DEMO MODE: in-memory messages reset on server restart. Set MONGODB_URI for persistence.');
 app.listen(PORT,()=>console.log(`Lab 4 API running at http://localhost:${PORT}`));}
start();