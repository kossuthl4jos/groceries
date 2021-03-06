import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { sandwich, bolognese } from './gateway/fake-gateway';
import { PrivateRoute } from './PrivateRoute';

import { Login, Signup, Header, Navbar, Statistics, ListManager, Items } from './components';

export const App = () => {
  const [lists, setLists] = useState([...sandwich, ...bolognese]);
  const [selectedListId, setSelectedListId] = useState('1');

  const addList = (list: any) => {
    const newLists = [...lists, list];
    setLists(newLists);
    setSelectedListId(list.id);
  };

  const addItem = (item: any) => {
    const newLists = [...lists];
    if (selectedListId != null) {
      newLists.find((list) => list.id === selectedListId)!.items.push(item);
      setLists(newLists);
    }
  };

  const completeItem = (completedItem: any) => {
    const newLists = [...lists];
    Object.assign(
      newLists
        .find((list) => list.id === selectedListId)!
        .items.find((item) => item.itemId === completedItem.itemId),
      completedItem,
    );

    setLists(newLists);
  };

  const deleteItem = (itemId: string) => {
    const newLists = [...lists];
    const itemIndexToDelete = newLists
      .find((list) => list.id === selectedListId)!
      .items.findIndex((item) => item.itemId === itemId);

    if (itemIndexToDelete != null && selectedListId != null) {
      newLists.find((list) => list.id === selectedListId)!.items.splice(itemIndexToDelete, 1);
      setLists(newLists);
    }
  };

  const getSelectedList = () => {
    return lists.find((item) => item.id === selectedListId);
  };

  const updateSelectedList = (selectedListId: string) => {
    setSelectedListId(selectedListId);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute>
            <Route
              path="/lists"
              element={
                <div>
                  <Header />
                  <ListManager
                    addList={addList}
                    addItem={addItem}
                    selectedListId={selectedListId}
                    updateSelectedList={updateSelectedList}
                    lists={lists}
                  />
                  <Items
                    deleteItem={deleteItem}
                    completeItem={completeItem}
                    items={getSelectedList()?.items}
                  />
                  <Navbar />
                </div>
              }
            />
            <Route path="/stats" element={<Statistics lists={lists} />} />
            <Route path="/">
              <Navigate to="/lists" />
            </Route>
          </PrivateRoute>
        </Routes>
      </Router>
    </div>
  );
};
