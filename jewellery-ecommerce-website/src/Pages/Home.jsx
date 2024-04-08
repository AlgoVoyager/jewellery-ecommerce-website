import React from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Citem from "../Components/Citem";
import categories from "../data/demodata";
var {New,allcategories,recommended,mostGifted,collections} = categories
const Home = () => {
  

  return (
    <div>
      <Nav />
      <main className="">
        <div className="caro">
          {/*block 1*/}
          <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw7f7d0da9/homepage/HeroBanner/rings-desktop.jpg"></img>
        </div>
        <div className="category flex flex-col gap-10">
          {/*block 2*/}
          <h1 className="text-center font-bold text-3xl py-7">
            shop by category
          </h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-11/12 mx-auto">
            {allcategories.map((category) => (
              <Citem
                cName={category.cName}
                cLink={category.cLink}
                cImg={category.imgurl}
                size={"w-56 h-56"}
              />
            ))}
          </div>
        </div>
        <div className="category flex flex-col gap-10">
          {/*block 3*/}
          <h1 className="text-center font-bold text-3xl py-7">
            shop by collection
          </h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-11/12 mx-auto">
            {collections.map((collection) => (
              <Citem
              cName={collection.cName}
              cLink={collection.cLink}
              cImg={collection.imgurl}
                size={"w-56 h-56"}
              />
            ))}
          </div>
        </div>
        <div className="category flex flex-col gap-10">
          {/*block 4*/}
          <h1 className="text-center font-bold text-3xl py-7">New for you</h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-11/12 mx-auto">
            {New.map((New) => (
              <Citem cName={New.cName}
              cLink={New.cLink}
              cImg={New.imgurl} size={"w-96 h-72"} />
            ))}
          </div>
        </div>
        <div className="category flex flex-col gap-10">
          {/*block 5*/}
          <h1 className="text-center font-bold text-3xl py-7">
            shop by gender
          </h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-11/12 mx-auto">
            <Citem
              cImg="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwef4310c0/homepage/ShopByGender/Men.jpg"
              cName="Mens"
              cLink={"/jewellery?gender=mens"}
              size={"w-96 h-72"}
            />
            <Citem
              cImg="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwef4310c0/homepage/ShopByGender/Men.jpg"
              cName="Kids"
              cLink={"/jewellery?gender=kids"}
              size={"w-96 h-72"}
            />
            <Citem
              cImg="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwef4310c0/homepage/ShopByGender/Men.jpg"
              cName="Womens"
              cLink={"/jewellery?gender=womens"}
              size={"w-96 h-72"}
            />
          </div>
        </div>

        <div className="category flex flex-col gap-10">
          {/*block 6*/}
          <h1 className="text-center font-bold text-3xl py-7">most gifted</h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-full mx-auto">
          {mostGifted.map((item) => (
              <Citem
              cName={item.cName}
              cLink={item.cLink}
              cImg={item.imgurl}
                size={"w-56 h-56"}
              />
            ))}
          </div>
        </div>
        <div className="category flex flex-col gap-10">
          {/*block 7*/}
          <h1 className="text-center font-bold text-3xl py-7">Recommended for you</h1>
          <div className="h-0.5 w-1/3  bg-[#832729] mx-auto"></div>
          {/*underline code*/}
          <div className="flex gap-7 flex-wrap justify-center w-full mx-auto">
          {recommended.map((item) => (
              <Citem
              cName={item.cName}
              cLink={item.cLink}
              cImg={item.imgurl}
                size={"w-56 h-56"}
              />
            ))}
          </div>
        </div>
        <section>
          
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
