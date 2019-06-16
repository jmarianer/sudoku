import * as React from './noreact';

export function slide(text: string, body: JSX.Element) {
  return <div class="slide"><h2>{ text }</h2>{ body }</div>
}
export function slideshow(title: string, slides: JSX.Element[]) {
  return <html>
    <head>
      <link rel='stylesheet' href='style.css' />
      <script src='https://code.jquery.com/jquery-3.4.1.slim.min.js' />
      <script src='slideshow.js' />
    </head>

    <body>
      <h1>{ title }</h1>
      <div class="slideshow">{ slides }</div>
      <button id="previousSlide">Previous</button>
      <button id="nextSlide">Next</button>
    </body>
  </html>;
}
