const dynamicallyLoadScript = (url: string) => {
  const script = document.createElement('script'); // create a script DOM node
  script.src = url; // set its src to the provided URL

  document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
};

export { dynamicallyLoadScript };
