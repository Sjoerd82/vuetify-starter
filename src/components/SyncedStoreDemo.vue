<template>
    <div>
        <h1>Todo Vue</h1>
        <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            v-model="newTodo"
            @keyup.enter="addTodo"
        />
        <ul class="todo-list">
            <li
                v-for="todo in store.todos"
                class="todo"
            >
                <div class="view">
                <label>
                    <input class="toggle" type="checkbox" v-model="todo.completed" />
                    {{ todo.title }}
                </label>
                <button class="destroy" @click="removeTodo(todo)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
  //import { store } from "./store";
  import { ref } from "vue";
  import * as Vue from "vue";
  import { enableVueBindings } from "@syncedstore/core";
  
  import { syncedStore, getYjsDoc } from "@syncedstore/core";
  import { WebrtcProvider } from "y-webrtc";

  // make SyncedStore use Vuejs internally
  enableVueBindings(Vue);

  // (optional, define types for TypeScript)
  type Todo = { completed: boolean, title: string };

  // Create your SyncedStore store
  const store = syncedStore({ todos: [] as Todo[], fragment: "xml" });

  // Create a document that syncs automatically using Y-WebRTC
  const doc = getYjsDoc(store);
  const webrtcProvider = new WebrtcProvider("syncedstore-todos", doc);

  const disconnect = () => webrtcProvider.disconnect();
  const connect = () => webrtcProvider.connect();

  let newTodo = ref("")

  function addTodo() {
        const value = newTodo.value && newTodo.value.trim();
        if (!value) {
          return;
        }
        store.todos.push({
          title: value,
          completed: false,
        });
        newTodo.value = "";
  }
  function removeTodo(todo: Todo) {
    store.todos.splice(store.todos.indexOf(todo), 1);
  }

</script>
  
<style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
  
  ul {
    text-align:left;
  }
  
  li button {
    margin-left:1em;
  }
</style>