<template>
    <v-card title="Pouch DB">
        <v-card-text>
            Remote database:
            <pre>
                {{ dbInfo }}
            </pre>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import PouchDB from 'pouchdb-browser'
    //let db = new PouchDB('kittens')
    let db = new PouchDB('http://localhost:5984/dread',{ auth: {username:'admin', password:'k0ngf00'} })
    let dbInfo = ref({})
    console.log(db)
    db.info().then(function (info) {
        dbInfo.value = info
        console.log(info);
    })
</script>