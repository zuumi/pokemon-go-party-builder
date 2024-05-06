export default function Adovertisement() {
  const advertisementList = [
    {
      productUrl:"https://amzn.to/44woB5n",
      imageUrl:"https://m.media-amazon.com/images/I/71Qt8qU82XL._AC_SL1500_.jpg",
      imageWidth:"395px",
    },
    {
      productUrl:"https://amzn.to/44KHPEJ",
      imageUrl:"https://m.media-amazon.com/images/I/81+pyKbWc2L._AC_SL1500_.jpg",
      imageWidth:"473px",
    },
    {
      productUrl:"https://amzn.to/3JLSW6i",
      imageUrl:"https://m.media-amazon.com/images/I/61Ce4hVjriL._AC_SL1500_.jpg",
      imageWidth:"116px",
    },
    {
      productUrl:"https://amzn.to/4dk3M10",
      imageUrl:"https://m.media-amazon.com/images/I/51vkJ2StbuL._AC_SL1356_.jpg",
      imageWidth:"291px",
    }
  ];

  return (
      <div className="container px-6 py-2 bg-blue-100 h-auto mx-auto">
        <div className="bg-white h-auto text-black text-center p-4 my-2 flex overflow-x-auto whitespace-nowrap">
          {advertisementList.map(
            (advertisement, index) => {
              return (
                <a
                  href={advertisement.productUrl}
                  className="inline-flex items-center justify-center mr-12"
                  style={{ minWidth: advertisement.imageWidth }}
                  key={index}
                >
                  <img
                    className="h-[300px]"
                    src={advertisement.imageUrl}
                    style={{ width: advertisement.imageWidth }}
                  />
                </a>
              );
            }
          )}
        </div>
      </div>
  );
}