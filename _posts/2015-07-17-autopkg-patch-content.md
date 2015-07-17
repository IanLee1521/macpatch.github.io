---
layout: doc-page
title: "AutoPkg patch content"
category: doc
date: 2015-07-17 09:35:06
order: 9999
mediadir: autopkg-patch-content
---


The MacPatchImporter for AutoPkg processor adds the ability to upload AutoPkg packages to a MacPatch server.

#### MacPatchImporterProcessor
The MacPatchImporterProcessor recipe is an AutoPkg ["shared recipe processor"](https://github.com/autopkg/autopkg/wiki/Processor-Locations#shared-recipe-processors). It's a "stub" recipe that makes the MacPatchImporter processor available to your other recipes. The other ".macpatch" recipes in this repo use that stub to access the "MacPatchImporterProcessor.py" processor.

#### Setup

You must have [AutoPkg](https://github.com/autopkg/autopkg/releases/latest) installed and the main recipe repo added.

```shell
autopkg repo-add http://github.com/autopkg/recipes.git
```

You can find more information on AutoPkg [here](http://autopkg.github.io/autopkg/)

###### Add the MacPatch repo

```shell
autopkg repo-add https://github.com/SMSG-MAC-DEV/MacPatch-AutoPKG.git
```

###### Configure MacPatch environment settings
Some settings can be set for all .macpatch recipes in the AutoPkg preferences.

```shell
defaults write com.github.autopkg MP_URL https://macpatch.company.com
defaults write com.github.autopkg MP_USER autopkg
defaults write com.github.autopkg MP_PASSWORD password
```

Environments using self signed certificates should set the following key.

```shell
defaults write com.github.autopkg MP_SSL_VERIFY -bool NO
```

###### Create override for a recipe
It's best to use [overrides](https://github.com/autopkg/autopkg/wiki/Recipe-Overrides) to set the recipe specific inputs for your environment. 

```shell
autopkg make-override Firefox.macpatch
```

Only keep the keys that you alter. Remove any unchanged keys from the override file.
