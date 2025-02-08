import { Button } from "./Button";

export function Main() {
  return (
    <main className="bg-background text-outline px-1">
      {/*Hero Section */}
      <div className="flex  flex-col items-center gap-2">
        <section className="h-[80vh] flex flex-col md:flex-row items-center max-w-3xl gap-2">
          <div className="w-1/2 h-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20Sheet-iSKzVaKGlkK0UOLq4vJGdqR7TOxZMd.png"
              alt="Hero background"
              className=""
            ></img>
          </div>

          <div className="w-1/2 h-full max-w-2xl">
            <div className="flex flex-col items-center">
              <h1 className="font-prosto text-2x1 md:text-3xl mb-6">
                Cada día es único, al igual que nuestro té
              </h1>
              <p className="text-lg mb-8">
                Cada día trae nuevas experiencias, y cada taza de té que
                ofrecemos está diseñada para acompañarte en esos momentos
                especiales. Descubre la calidad y el sabor inigualable de
                nuestros tés orgánicos, cuidadosamente seleccionados para ti.
              </p>
              <div className="btn-primary">
                <Button href="/products">Descubre más</Button>
              </div>
            </div>
          </div>
        </section>

        {/*Features Section */}
        <section className="py-16 bg-gray-50"></section>
      </div>
    </main>
  );
}
