'use client';
import LanguageSelector from '../components/LanguageSelector';

export default function Home() {
  return (
    <>
      {/* Language Selector */}
      <LanguageSelector />
      
      <header id="mainPageHeader">
        <h1>How much do 100 calories cost?</h1>
      </header>
      
      <main id="mainPageMain">
        <p>You're in the store. You look at shelves full of products. Prices per kilogram are visible, labels clearly
          state the <em>energy value</em>... but do you really know <strong>how cost-effective a given product
            is?</strong></p>
        
        <p>Are you aware that <strong>some products are indeed several times more expensive than others</strong>?</p>
        
        <div className="home-highlight-box">
          <p>This page was created to answer precisely that question. With this <em>simple calculator</em>, you'll
            calculate in <em>just a few seconds</em> how much 100 calories of a given product cost you – it's a
            <strong>quick and practical way to compare the cost-effectiveness of different food options</strong>.</p>
        </div>
        
        <h2>This calculator will be useful for anyone who:</h2>
        <ul id="mainPageul">
          <li>controls <strong>daily calorie intake</strong></li>
          <li>wants to make <strong>informed purchasing decisions</strong></li>
          <li>looks for ways to <strong>save money</strong>, <em>without compromising on quality</em></li>
        </ul>
        
        <div className="home-cta-text">
          <p>The best part is that you can have this calculator <strong>always at hand</strong> – all you need is a phone
            and access to the website. <strong>Calculating the cost of 100 kcal</strong> will take you literally <em>10
              seconds</em>, even <em>while standing at the store shelf</em>.</p>
        </div>
        
        <h2>Why is it worth calculating calorie cost?</h2>
        
        <p>In a world where <strong>food is getting more expensive</strong>, it's worth knowing not only <strong>how
            much 1 kg of a given product costs</strong>, but also <strong>how much you'll pay for its energy
            value</strong>. Especially if you're <em>counting calories</em>, <em>losing weight</em>,
          <em>training</em>, or simply want to have <strong>greater awareness</strong> of what you're buying.</p>
        
        <div className="home-highlight-box">
          <p>Remember – calorie counting is not just a <em>way to diet</em>, but also <strong>real control over
              expenses</strong> and a better <strong>understanding of the value of what we eat</strong>. And while
            <strong>price matters</strong>, let's not forget: <strong>product quality</strong> <em>always remains
              key</em>.</p>
        </div>
      </main>
    </>
  );
}