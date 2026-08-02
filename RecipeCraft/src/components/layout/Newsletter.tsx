export default function Newsletter() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl rounded-[40px] bg-[#2D4A3E] px-10 py-20 text-center text-white">

        <h2 className="font-serif text-5xl font-bold">
          Never Miss A Recipe
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          Join thousands of food lovers and receive delicious recipes directly in your inbox.
        </p>

        <div className="mx-auto mt-10 flex max-w-xl overflow-hidden rounded-full bg-white">
          <input
            placeholder="Enter your email"
            className="flex-1 px-6 py-5 text-black outline-none"
          />

          <button className="bg-[#C8501A] px-8 text-white">
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
}