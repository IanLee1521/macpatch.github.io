---
layout: doc-page
title: "Install Distribution Server"
category: doc
date: 2015-06-04 17:13:24
order: 9999
---

## Table of Contents
--
* [Required Software](#a1)
	* [Mac OS X] (#a1a)	
	* [Ubuntu](#a1b)
	* [Fedora / RHEL](#a1c)
	* [Python](#a1d)
* [Install Server Software](#a2) 
	* [Install from Archive](#a2a)	
	* [Install from Source](#a2b)	
* [Server Setup](#a3)
* [Console Configuration ](#a4)
* [Sync/Download Content](#a5)

<a name='a1'></a>
## Required Software
--

<a name='a1a'></a>
### Mac OS X Requirements

* Mac OS X 10.9 or higher
* Java 1.8 JDK
* Xcode & Xcode command line tools

### Linux Requirements

<a name='a1b'></a>
#### Ubuntu 

*Packages (apt-get)*

	git, build-essential, openjdk-8-jdk, python-pip, mysql-connector-python
	
<a name='a1c'></a>	
### Fedora / RedHat Enterprise Linux 

*Packages (yum)*

	gcc-c++, git, java-1.8.0-openjdk-devel, python-pip, mysql-connector-python

<a name='a1d'></a>	
### PIP (Python Modules) 
All python modules will be installed during the build script.

	argparse, mysql-connector-python, requests, biplist, wheel, python-crontab

<a name='a2'></a>		
## Install Server Software
--

When building and the Master server from source the build script will ask if you want to create an archive of the install. If you choose "Y" (yes), the script create an archive called `MacPatch_Server.zip` in `/Library/MacPatch`. This zip file is a complete copy of the master server build in a unconfigured state.

<a name='a2a'></a>	
##### Install from Archive

Installing from archive will require the install of the required packages for the selected OS, and python modules.

	mkdir -p /Library/MacPatch
	cp {FROM_PATH}/MacPatch_Server.zip /Library/MacPatch
	cd /Library/MacPatch
	unzip ./MacPatch_Server.zip
	mv ./MacPatch_Server ./Server

<a name='a2b'></a>		
##### Install From Source
	
	sudo mkdir -p /Library/MacPatch/tmp
	cd /Library/MacPatch/tmp
	sudo git clone https://github.com/SMSG-MAC-DEV/MacPatch.git
	sudo /Library/MacPatch/tmp/MacPatch/scripts/MPBuildServer.sh

<a name='a3'></a>
## Setup Distribution Server 
--
The MacPatch Distribution server has a couple of configuration scripts, and they should be run in the given order. The scripts are located on the server in `/Library/MacPatch/Server/conf/scripts/Setup/`.

Script	| Description | Server | Required
---|---|---|---
DataBaseLDAPSetup.py | The database setup is required for MacPatch to function. | All | Required
StartServices.py | This script will add nessasary startup scripts and start and stop the MacPatch services.<ul><li>Setup Services: StartServices.py --setup</li><li>Start All Services: StartServices.py --load All</li><li>Stop All Services - StartServices.py --unload All</li></lu> | Master, Distribution | Required

##### DataBaseLDAPSetup.py
* Only Configure the database information. The default admin and LDAP Auth is not needed for a distribution server. 

##### StartServices.py
* Run the StartServices.py script with "--setup" only enable the WebServices and Sync content from Master.

<a name='a4'></a>
## Add Server via Admin Console
--
The new distribution server will need to be added to the list of servers for your MacPatch environment.

* Go to "Admin-> Server -> MacPatch Servers"
* Click the "+" icon to add a new server

Example data for Master server:

* Server: dist-server1.macpatch.com
* Port: 2600
* Use SSL: Yes
* Use SSL Auth: NO (Not Supported Yet)
* Allow Self-Signed Cert: Yes
* Is Master: No
* Is Proxy: No
* Active: Yes 

<a name='a5'></a>
## Sync Content from Master
--
To syncronize all of the MacPatch content on to the distribution server you will first need to add the IP Address or hostname to the MacPatch rsyncd.conf (/Library/MacPatch/Server/conf/etc/rsyncd.conf) file located on the **Master** server. 

Add the IP Address or hostname to each section in the "hosts allow" attribute. The list of servers is comma delimited.

#### Sync the content (Distribution Server)
Mac OS X

	sudo -u _appserver /Library/MacPatch/Server/conf/scripts/MPSyncContent.py

Linux

	sudo -u www-data /Library/MacPatch/Server/conf/scripts/MPSyncContent.py