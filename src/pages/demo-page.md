---
layout: layouts/base.njk
title: Demo Page
permalink: /demo/index.html
hero:
  alt: The words '1920 x 1080'
  base: 'https://res.cloudinary.com/sleepingkiwi/image/upload/'
  dominant:
    - 44
    - 44
    - 44
  filename: sleepingkiwi-eleventy/download_qvssbn.png
  height: 1080
  src: >-
    https://res.cloudinary.com/sleepingkiwi/image/upload/v1576201524/sleepingkiwi-eleventy/download_qvssbn.png
  version: v1576201524
  width: 1920
genericContentBlocks:
  - backgroundColour: true
    content:
      - header: Some big text
        preHeader: Here it comes
        textAlign: center
        type: header
      - text: >-
          And here's some real content. Probably telling you to click the button
          below...
        textAlign: center
        type: text
      - cta: Click me!
        ctaURL: /
        type: cta
    type: oneColumn
  - backgroundColour: false
    leftColumnContent:
      - images:
          - alt: Green square
            base: 'https://res.cloudinary.com/sleepingkiwi/image/upload/'
            dominant:
              - 4
              - 84
              - 84
            filename: sleepingkiwi-eleventy/300by300-b_eolzec.png
            height: 300
            src: >-
              https://res.cloudinary.com/sleepingkiwi/image/upload/v1576046342/sleepingkiwi-eleventy/300by300-b_eolzec.png
            version: v1576046342
            width: 300
          - alt: Green square
            base: 'https://res.cloudinary.com/sleepingkiwi/image/upload/'
            dominant:
              - 4
              - 84
              - 84
            filename: sleepingkiwi-eleventy/300by300-b_eolzec.png
            height: 300
            src: >-
              https://res.cloudinary.com/sleepingkiwi/image/upload/v1576046342/sleepingkiwi-eleventy/300by300-b_eolzec.png
            version: v1576046342
            width: 300
        imagesList:
          - image:
              alt: ''
              base: 'https://res.cloudinary.com/sleepingkiwi/image/upload/'
              dominant:
                - 4
                - 84
                - 84
              filename: sleepingkiwi-eleventy/300by300-b_eolzec.png
              height: 300
              src: >-
                https://res.cloudinary.com/sleepingkiwi/image/upload/v1576046342/sleepingkiwi-eleventy/300by300-b_eolzec.png
              version: v1576046342
              width: 300
        type: images
    rightColumnContent:
      - text: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        textAlign: left
        type: text
    type: twoColumns
transparentHeader: true
footerCTA: true
meta:
  description: >-
    This is a demo page and this description should overwrite the default one in
    the site meta!
  socialImage:
    alt: Does an alt tag without an image overwrite?
  title: Demo Page
---

