import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App()
{
  const [friends, SetFriends] = useState(initialFriends);
  const [showAddFriend, SetShowAddFriend] = useState(false);
  const [selectedFriend, SetSelectedFriend] = useState(null);

  function HandleShowAddFriend()
  {
    SetShowAddFriend(show => !show);
  }

  function HandleAddFriend(friend)
  {
    SetFriends(friends => [...friends, friend]);
    SetShowAddFriend(false);
  }

  function HandleSelectedFriend(friend)
  {
    SetSelectedFriend(currentFriend => currentFriend?.id === friend.id ? null : friend);
    SetShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar"> 
        <FriendsList 
          friends={friends} 
          selectedFriend={selectedFriend}
          OnSelection={HandleSelectedFriend}
        />

        {showAddFriend && <FormAddFriend OnAddFriend={HandleAddFriend}/>}

        <Button onClick={HandleShowAddFriend}> 
          {showAddFriend ? "CLOSE" : "ADD FRIEND"} 
        </Button>
      
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  )
}

function Button({children, onClick})
{
  return <button className="button" onClick={onClick}> {children} </button>;
}

function FriendsList({friends, OnSelection, selectedFriend}) 
{
  return (
  <ul>
    {friends.map(friend => 
    <Friend 
      friend={friend}
      OnSelection={OnSelection}
      selectedFriend={selectedFriend}
      key={friend.id}/>)}
  </ul>
  )
}

function Friend({friend, OnSelection, selectedFriend})
{
  const isSelected = selectedFriend?.id === friend.id;

  return (
  <li className={isSelected ? "selected" : ""}> 
    <img src={friend.image} alt ={friend.name}/>
    <h3>{friend.name}</h3>
    {
      friend.balance < 0 && 
      <p className="red"> 
        You owe {friend.name} ${Math.abs(friend.balance)}
      </p>
    }
    {
      friend.balance > 0 && 
      <p className="green"> 
        {friend.name} owes you ${Math.abs(friend.balance)}
      </p>
    }
    {
      friend.balance === 0 && 
      <p> 
        You and {friend.name} are even.
      </p>
    }

    <Button onClick={()=>OnSelection(friend)}> {isSelected ? "CLOSE" : "SELECT"} </Button>
  </li>);
}

function FormAddFriend({OnAddFriend})
{
  const [friendName, SetFriendName] = useState("");
  const [friendImage, SetFriendImage] = useState("https://i.pravatar.cc/48");

  function HandleSubmit(event)
  {
    event.preventDefault();
    if(!friendName || !friendImage) return;

    const id = crypto.randomUUID();
    const newFriend = 
    {
      id,
      friendName, 
      friendImage: `${friendImage}?=${id}`, 
      balance: 0, 
    };
    OnAddFriend(newFriend);
    SetFriendName("");
    SetFriendImage("");
  }

  return (
    <form className="form-add-friend" onSubmit={HandleSubmit}>  
      <label> Friend name </label>
      <input 
        type="text" 
        value={friendName}
        onChange={event=>SetFriendName(event.target.value)}
      />
      <label> Image URL </label>
      <input 
        type="text" 
        value={friendImage}
        onChange={event=>SetFriendImage(event.target.value)}
      />

      <Button> ADD </Button>
    </form>
  )
}

function FormSplitBill({selectedFriend})
{
  const [bill, SetBill] = useState("");
  const [paidByUser, SetPaidByUser] = useState("");
  const [whoIsPaying, SetWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - paidByUser : "";

  return (
  <form className="form-split-bill">
    <h2> Split a bill with {selectedFriend.name}</h2>

    <label> Bill value </label>
    <input 
      type="text" 
      value={bill} 
      onChange={event => SetBill(Number(event.target.value))}
    />

    <label> Your expenses </label>
    <input 
      type="text" 
      value={paidByUser} 
      onChange={event => SetPaidByUser(Number(event.target.value) > bill ? paidByUser : Number(event.target.value))}
    />

    <label> {selectedFriend.name}'s expense </label>
    <input 
      type="text" 
      value={paidByFriend} 
      disabled 
    />

    <label> Who is paying the bill? </label>
    <select 
      value={whoIsPaying} 
      onChange={event => SetWhoIsPaying(event.target.value)}
    > 
      <option value="user"> You </option>
      <option value="friend"> {selectedFriend.name} </option>
    </select>

    <Button> SPLIT BILL </Button>
  </form>
  )
}