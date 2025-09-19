"use client"

import Container from "./container";

const About = () => {
  
  return (
    <Container className="flex items-center md:gap-x-1 justify-between md:justify-start">
      <div>
        <p className="px-3 pt-3 pb-1 text-xl">Over Alomnify</p>
        <p className="px-3 pb-2 text-sm">Alomnify is opgezet, omdat ik vind dat we de mogelijkheid zouden moeten hebben om onze plantencollectie vast te 
          leggen, zodat we die eenvoudig kunnen tonen aan anderen.</p>
        <p className="px-3 pb-2 text-sm">Wanneer u een klein paradijsje naast uw huis hebt, met wellicht veel bijzondere, bedreigde of eetbare planten, 
          dan verdient dit aandacht, zeker wanneer u uw huis wilt verkopen. Ik ben van mening dat dit de waarde van uw huis zou moeten verhogen. Met 
          inzicht in uw plantencollectie kunnen potentiële kopers zich beter oriënteren.</p>
        <p className="px-3 pb-2 text-sm">Er zijn veel mensen die houden van bloemen, van een mooie tuin en van een overvloed aan leven. Er zijn veel 
          potentiële kopers die zoeken naar zo&apos;n paradijsje.</p>
        <p className="px-3 pb-2 text-sm">Planten vormen de basis van de voedselpiramide. Hebben we veel verschillende plantensoorten, dan zullen we veel 
          leven (bv. van bijen, vlinders en vogels) aantreffen. Ik hoop dat dit initiatief in de toekomst zal leiden tot  een extra zoekcriterium 
          (bv. biodiversiteitsscore) op een site als funda. En ik hoop op een tweede-orde-effect wanneer mensen er massaal achter komen dat de waarde 
          van hun huis vermeerdert als ze meer plantensoorten in hun tuin zetten.</p>
      </div>
    </Container>
  );
};

export default About;