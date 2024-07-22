/** @format */

import Container from "./Container/Container";
import FooterSocial from "./FooterSocial";

const Footer = () => {
  return (
    <div id="footer" className="w-full mt-12 h-auto bg-slate-950 py-4">
      <Container className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-between flex-col">
          <FooterSocial />
        </div>
        <div>
          <div className="text-sm text-[#51545f] transition-all">
            ©2023 Todos os direitos reservados. Este modelo foi criado por
            <a
              className="text-slate-500 ml-1 font-medium"
              href="https://github.com/Jhonypd"
            >
              Jhony Pereira
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
