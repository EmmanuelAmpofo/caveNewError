import image1 from "../../assets/WatchSelection/1.png"
import image2 from "../../assets/WatchSelection/2.png"
import image3 from "../../assets/WatchSelection/3.png"
import image4 from "../../assets/WatchSelection/4.png"
import image5 from "../../assets/WatchSelection/5.png"
import image6 from "../../assets/WatchSelection/6.png"
import image7 from "../../assets/WatchSelection/7.png"
import image8 from "../../assets/WatchSelection/8.png"


import { WATCHDATA } from "./WatchData";

export const DIALS = [
  {
    id: 1,
    name: "plain",
    description: "DIAL 1 description",
    price: 865,
    image: WATCHDATA.dial.plain,
  },
  {
    id: 2,
    name: "erotic",
    description: "DIAL 2 description",
    price: 130,
    image: WATCHDATA.dial.erotic,
  },
  {
    id: 3,
    name: "numbers",
    description: "DIAL 3 description",
    price: 1040,
    image: WATCHDATA.dial.numbers,
  },
  {
    id: 4,
    name: "romans",
    description: "DIAL 4 description",
    price: 1040,
    image: WATCHDATA.dial.romans,
  },
];

export const CASE = [
  {
    id: 1,
    name: "black",
    description: "CASE 1 description",
    price: 1580,
    image: WATCHDATA.case.black,
  },
  {
    id: 2,
    name: "gold",
    description: "CASE 2 description",
    price: 1432,
    image: WATCHDATA.case.gold,
  },
  {
    id: 3,
    name: "rose_gold",
    description: "CASE 3 description",
    price: 990,
    image: WATCHDATA.case.rose_gold,
  },
  {
    id: 4,
    name: "silver",
    description: "CASE 4 description",
    price: 990,
    image: WATCHDATA.case.silver,
  },
];

export const STRAP = [
  {
    id: 1,
    name: "black",
    description: "STRAP 1 description",
    price: 509,
    image: {
      top: WATCHDATA.strap.black.top,
      bottom: WATCHDATA.strap.black.bottom,
    },
  },
  {
    id: 2,
    name: "gold_chain",
    description: "STRAP 2 description",
    price: 790,
    image: {
      top: WATCHDATA.strap.gold_chain.top,
      bottom: WATCHDATA.strap.gold_chain.bottom,
    },
  },
  {
    id: 3,
    name: "rose_gold",
    description: "STRAP 3 description",
    price: 1000,
    image: {
      top: WATCHDATA.strap.rose_gold.top,
      bottom: WATCHDATA.strap.rose_gold.bottom,
    },
  },
  {
    id: 4,
    name: "silver",
    description: "STRAP 4 description",
    price: 1000,
    image: {
      top: WATCHDATA.strap.silver.top,
      bottom: WATCHDATA.strap.silver.bottom,
    },
  },
  {
    id: 5,
    name: "wine_leather",
    description: "STRAP 5 description",
    price: 1000,
    image: {
      top: WATCHDATA.strap.wine_leather.top,
      bottom: WATCHDATA.strap.wine_leather.bottom,
    },
  },
];

export const WATCHES = [
  {
    id: 1,
    name: "Watch Model 1",
    image: image1
  },
  {
    id: 2,
    name: "Watch Model 2",
    image: image2
  },
  {
    id: 3,
    name: "Watch Model 3",
    image: image3
  },
  {
    id: 4,
    name: "Watch Model 4",
    image: image4
  },
  {
    id: 5,
    name: "Watch Model 5",
    image: image5
  },
  {
    id: 6,
    name: "Watch Model 6",
    image: image6
  },
  {
    id: 7,
    name: "Watch Model 7",
    image: image7
  },
  {
    id: 8,
    name: "Watch Model 8",
    image: image8
  },
]
