import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import DefaultAvatar from '/src/assets/defaulAvatar.png';

export default function Home() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-between">
            <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
              <Search className="size-4 text-emerald-300" />
              <input
                className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                placeholder="Buscar usuários..."
              />
            </div>
          </div>

          <div className="w-full">
            <ul className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between flex-wrap py-3 px-4 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img className="w-10 h-10 rounded-full mr-4" src={DefaultAvatar} alt="Avatar of..." />
                      <div className="text-sm flex flex-col">
                        <a href="#" className="font-semibold text-base leading-none hover:underline">
                          Jonathan Reinink
                        </a>
                        <span className="text-sm font-light">jonathanReinink</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">5 followers</span>
                      <span className="text-sm">9 following</span>
                      <span className="text-sm">87 Repositorios</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="py-3 px-4 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm">Showing 10 of 228 items</span>
              </div>
              <div className="inline-flex items-center gap-8">
                <span className="text-sm">Page 1 of 23</span>

                <div className="flex gap-1.5">
                  <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronsLeft className="size-4" />
                  </button>
                  <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronRight className="size-4" />
                  </button>
                  <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronsRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
