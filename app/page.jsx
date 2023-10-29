import Feed from "@components/Feed"

const Home = () => {
  return (
    <>
    <section className="w-full flex-center flex-col" >
        <h1 className="head_text text-center" >Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center" >AI-powered Prompts</span>
        </h1>
        <p className="desc " > Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda velit accusantium quos labore architecto similique doloremque fugit aliquid, iste quibusdam?</p>
        <Feed />
    </section>
    </>
  )
}

export default Home