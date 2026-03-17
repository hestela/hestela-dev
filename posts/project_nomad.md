---
title: Off Grid Knowledge Hub and AI Chat
date: 2026-03-16
author: Henry Estela
tags:
  - AI
  - ollama
  - off-grid
---

I've been subscribed to the Crosstalk Solutions channel for some time, mainly since  it got me interested in Unifi equipment for my home wi-fi and theres been some other fun homelab videos in that channel. I recently saw a video from there named [I Created an Offline AI Server for When SHTF Happens](https://www.youtube.com/watch?v=P_wt-2P-WBk) which was interesting to me since I do have interest in emergency preparedness.  

I've been playing around with it using my slightly cursed [Proxmox Docker in LXC setup](https://github.com/hestela/lxc-proxmox-terraform) and its been a good time.   

The video introduces [Project Nomad](https://www.projectnomad.us) [(github)](https://github.com/Crosstalk-Solutions/project-nomad) which has a collection of tools to download and serve up things like maps, wikipedia, pre-made document collections (ie medical, survival, agriculture, etc).  
![main-ui](../../files/main-ui.webp)  


Example of a couple collections that are loaded:
![documents](../../files/docs.webp)  

It also has an AI chat where it has a RAG setup for the documents that you have downloaded (ie if you download the medical guides collection, those will show up there) so that you can talk with the LLMs and get the context from those documents. You can also upload your own files and for an example I uploaded a PDF of some Unifi AP specifications and asked a about a specific AP and got a decent reply:
![ai-chat](../../files/ai-chat.webp)  

And the UI for seeing what documents have been processed for the AI chat:
![kb](../../files/kb.webp)  

After you download the documents, videos, LLM models and such that you want then the server can run completely offline.  

It's a cool project/idea and fun to setup on an old computer or maybe a mini-pc cyberdeck. Might be fun to go camping with a mini-PC with project nomad setup and play around with the AI chat and documents.  

I'm looking forward to seeing where this project goes. The github was pretty busy after the video was posted so there's definately a lot of interest in this kind of setup, but it's great to see this as a free as in freedom, open source project.
