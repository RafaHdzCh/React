import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    friendName: "Clark",
    friendImage: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    friendName: "Sarah",
    friendImage: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    friendName: "Anthony",
    friendImage: "https://i.pravatar.cc/48?u=499476",
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

  function HandleSplitBill(value)
  {
    SetFriends(friends => friends.map(friend => 
      (friend.id === selectedFriend.id) ? 
      {...friend, balance: friend.balance + value} 
      : 
      friend));

      SetSelectedFriend(null);
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

      {selectedFriend && 
      <FormSplitBill 
        selectedFriend={selectedFriend} 
        OnSplitBill={HandleSplitBill}
        key={selectedFriend.id}
      />}
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
    <img src={friend.friendImage} alt ={friend.name}/>
    <h3>{friend.friendName}</h3>
    {
      friend.balance < 0 && 
      <p className="red"> 
        You owe {friend.friendName} ${Math.abs(friend.balance)}
      </p>
    }
    {
      friend.balance > 0 && 
      <p className="green"> 
        {friend.friendName} owes you ${Math.abs(friend.balance)}
      </p>
    }
    {
      friend.balance === 0 && 
      <p> 
        You and {friend.friendName} are even.
      </p>
    }

    <Button onClick={()=>OnSelection(friend)}> {isSelected ? "CLOSE" : "SELECT"} </Button>
  </li>);
}

function FormAddFriend({OnAddFriend})
{
  const [friendName, SetFriendName] = useState("");
  const [friendImage, SetFriendImage] = useState("https://i.pravatar.cc/48?u=");

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

function FormSplitBill({selectedFriend, OnSplitBill})
{
  const [bill, SetBill] = useState("");
  const [paidByUser, SetPaidByUser] = useState("");
  const [whoIsPaying, SetWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";

  function HandleSubmit(event)
  {
    event.preventDefault();
    if(!bill || !paidByUser) return;
    OnSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
  <form className="form-split-bill" onSubmit={HandleSubmit}>
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

    <label> {selectedFriend.friendName}'s expense </label>
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
      <option value="friend"> {selectedFriend.friendName} </option>
    </select>

    <Button> SPLIT BILL </Button>
  </form>
  )
}