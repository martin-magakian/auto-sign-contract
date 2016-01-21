# student_mark
Helper to sign my PDF.

![auto sign contract](https://raw.github.com/martin-magakian/auto-sign-contract/master/README_src/icon.png)

*For now:*
- the PDF need to be 2 pages
- page1 get signed (bottom right)
- page1 get initials
- page2 get initials



### 1 - install node dependency
```
$ npm install
```

### 2 - require dependency
For Mac OSX:
```
$ brew install imagemagick graphicsmagick ghostscript poppler
```

### 3 - RUN
```
$ node index.js --pdf /path/to/pdf_to_signe.pdf --signature /path/to/signe.jpg --initials /path/to/initials.jpg
```

Working Example
=====
```
$ node index.js --pdf README_src/contract.pdf --signature README_src/initials.png --initials README_src/initials.png
# same as
$ node index.js --pdf README_src/contract.pdf
```

Contact
=========
Developed by Martin Magakian martin.magakian@gmail.com<br />
by [Anomaly Detection](https://anomaly.io)


License
=========
MIT License (MIT)


