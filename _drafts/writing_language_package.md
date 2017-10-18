---
layout: post
title:  "Welcome to Jekyll!"
date:   2016-12-31 21:46:42 -0500
comments: true
categories: blog jekyll update
---


Tips:
be careful with `.+` in regexes. Atom's regex highlighter is greedy, so you almost always want `[^"]` instead, if you were doing `begin: '"'` `end: '"'`. Otherwise if there's another " on the line after what you want it to end on, the end will be greedy and choose the last one. But if you know you're ending with the `end` character sequence, then that shouldn't be matched in your inside.



