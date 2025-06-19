After cloning the project,

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

after heading into website, you will get to see
step - 1 : click on "place a order" button, you will be directed to menu items.
step - 2 : click on the add buttons, which are located just below the items. Now, your items are added to cart.
step - 3 : open your cart and place the order. After placing your order, you will get to see ""Order Status Pending"". This is because the admin didn't updated your order status yet in the admin dashboard.
step - 4 : To access the admin page, in chrome search this "" http://localhost:3000/admin "" , now you will get to see a login page, the credentials of the admin are located in .env.local file. Login through these credentials then you will get to see the admin dashboard.
step - 5 : How to update the order status??? -> for each and every order that users placed, in these website their orders will be displayed over there. For each order you will get to see a checkbox (if order is completed then please click on it and if not then update the delay time and click on send button )and there will be a input box to update the delay time.
step - 6 : Now in each and every cart page of users, you will get to see the order status that came from admin.


""""" The reason to make this website is, In our canteen we used to wait in queues to place and get order. Which is a absolute time waste. So I thought that making a website will help us to eliminate the need to wait in line, saving time and reducing canteen congestion, thus solving the problem of long queues. If our canteen management is agreed to use then we can develop a complete website . This is the reason why our website is not fully developed.""""


