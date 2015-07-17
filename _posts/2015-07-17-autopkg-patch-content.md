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

