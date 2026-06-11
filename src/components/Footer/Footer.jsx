import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-surface border-outline-variant mt-12 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <div className="text-on-surface flex items-center gap-2">
            <span className="text-2xl">👨‍💻</span>
            <p className="font-[Hanken\ Grotesk] text-sm md:text-base">
              Projeto Desenvolvido por{" "}
              <span className="text-primary font-semibold">
                Endrius da Silva dos Santos
              </span>
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/endrius-da-silva-dos-santos-8a7113328/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-primary rounded-full p-3 shadow-md transition-colors duration-300 hover:shadow-lg"
              title="LinkedIn"
            >
              <FaLinkedin size={24} className="text-white" />
            </a>

            <a
              href="https://github.com/endriusssantos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-primary rounded-full p-3 shadow-md transition-colors duration-300 hover:shadow-lg"
              title="GitHub"
            >
              <FaGithub size={24} className="text-white" />
            </a>
          </div>
        </div>

        <div className="border-outline-variant mt-6 border-t pt-4">
          <p className="text-secondary font-[Hanken\ Grotesk] text-center text-xs">
            © 2026 MySticker. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
