---
title: My Document Management Setup
draft: false
tags: []
comments: {}
date: 2026-03-03
---
Wanted to give a summary of the setup I have for managing my (mainly PDF) documents with [paperless-ngx](https://docs.paperless-ngx.com/).

## Software
The main software for managing documents is [paperless-ngx](https://docs.paperless-ngx.com/). 

It handles OCR and tries to automatically tag documents with things like the author (aka correspondent) and creation date.

I have it deployed with docker-compose on a Proxmox VM.

On the VM I setup a samba server to allow writing to the ingest folder

## Scanner
I have a HP LaserJet Pro MFP M227fdw for document scanning. Via the web interface (Scan->Scan to Network Folder->Scan to Network Folder Setup) I created a few SMB locations for when I scan (settings are what is on the scanner):
1. paperless ingestion
- Host: VM where paperless is running
- Scan File Type: PDF
2. JPEG
- Host: Other VM with SMB share
- Scan File Type: JPEG
3. PDF
- Host: Other VM with SMB share
- Scan File Type: PDF

These settings are the same on all of the shares:
- Scan Paper Size: Letter
- Scan Resolution: Text - 300 dpi
- Output Color: Color
- File Name Prefix: scan

I primarily use the document feeder for scanning.  
I'll do one-by-one scanning of more fragile papers on the scanning tray but this is very time consuming. It is usually not needed as the feeder will mostly play nice with most paper sizes (even those small tax forms like 1099-INT or 1095-C). Each new scan shows up as scan.pdf and after processing, paperless will delete the file from the ingestion folder.  

The scanner only scans single sided but I don't usually get double side printed documents and when I do, usually the text on the back side is of little interest to me.

## Single Document workflow
You tap the touch screen, hit scan, scan to network folder and then click on the option for my paperless SMB folder and start scanning. Then you need to go into the paperless web UI and add any missing correspondents, tags, etc. By default the name of the document will be based on the filename so after scanning you end up with files named some form of "scan". I come back and manually rename files after each scanning session.

## Multiple Document Workflow
I got tired of standing in front of the scanner and clicking through the menus multiple times and waiting. So what I do now is, I scan all the documents in one pass and send the files into the SMB share that doesn't go to the paperless ingestion folder.  

Then on my desktop, I grab the PDF and I use [PDF Arranger](https://github.com/pdfarranger/pdfarranger) to break up the PDF into multiple documents and then send those to the paperless SMB share. 

There's likely better ways to do this but I don't scan documents often enough to investigate and this workflow is efficient enough for my needs. I have saved a decent amount of time and also physical space using paperless instead of holding the documents forever.
