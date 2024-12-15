import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen'>
      
      <div className=" text-white max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-white">About Get Me A Coffee</h1>
        <p className="text-xl text-gray-400 mt-2">Support creators and show your appreciation!</p>
      </header>

      {/* What is Get Me A Coffee Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-white">What is Get Me A Coffee?</h2>
        <p className="text-lg text-gray-300 mt-4">
          Get Me A Coffee is a platform where creators can receive support from their fans and followers. Whether you're a musician, writer, developer, or any type of content creator, Get Me A Coffee allows your supporters to show their appreciation by buying you a coffee. It's simple, transparent, and makes it easy for creators to stay connected with their audience.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-white">How Does It Work?</h2>
        <p className="text-lg text-gray-300 mt-4">
          Fans can easily support their favorite creators by sending small donations, usually the cost of a coffee. As a creator, you can offer perks, exclusive content, or simply say thank you to those who support you.
        </p>
        <ul className="list-inside list-disc mt-4 space-y-2 text-lg text-gray-300">
          <li><strong>1. Set up your profile</strong> – Personalize your page with a bio, goals, and more.</li>
          <li><strong>2. Share your link</strong> – Spread the word about your page and invite your followers to support you.</li>
          <li><strong>3. Start receiving coffee</strong> – Get coffee donations from your fans and supporters.</li>
        </ul>
      </section>

      {/* Why Support Creators Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-white">Why Support Creators?</h2>
        <p className="text-lg text-gray-300 mt-4">
          Supporting creators helps them continue doing what they love. Your small donation can go a long way in helping creators fund their projects, improve their work, and stay motivated. Whether it's buying a coffee or contributing to a larger goal, every little bit helps!
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-white">Join Us Today!</h2>
        <p className="text-lg text-gray-300 mt-4">
          Are you a creator looking to earn a little extra support? Sign up today and start receiving coffee from your fans!
        </p>
        <Link href="/login" className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white font-semibold text-lg rounded-lg hover:bg-orange-600 transition duration-200">
          Get Started
        </Link>
      </section>
    </div>
    </div>
  )
}

export default About
