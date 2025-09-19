"use client"

import Container from "./container";

const Contact = () => {
  
  return (
    <Container className="flex items-center md:gap-x-1 justify-between md:justify-start">
      <div>
        <p className="px-3 pt-3 pb-1 text-xl">Contact</p>
        <p className="px-3 pb-2 text-sm">Mocht u een onvolledigheid in de plantendatabase aantreffen en u wil graag dat ik dit aanpas, dan kunt u mij <a className="underline" href="mailto:matthias.alexander.007@gmail.com" rel="noopener noreferrer">mailen</a>. Hetzelfde geldt wanneer u een andere reden heeft om contact te zoeken.</p>
      </div>
    </Container>
  );
};

export default Contact;