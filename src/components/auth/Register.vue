<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Sale Central System</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="email" name="email" label="Email" type="email" v-model="users.email"></v-text-field>
                   <v-text-field append-icon="person" name="firstname" label="Firstname" type="text" v-model="users.firstname"></v-text-field>
                  <v-text-field append-icon="person" name="lastname" label="Lastname" type="text" v-model="users.lastname"></v-text-field>
                  <div class="pt-1 pb-4" dark></div>
                  <v-divider></v-divider>
                  <v-text-field append-icon="person" name="user" label="Username" type="text" v-model="users.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="users.password"></v-text-field>
                  <v-text-field append-icon="lock" name="cfpassword" label="Confirm" id="cfpassword" type="password" v-model="users.cfpassword"></v-text-field>
                  <v-text-field append-icon="database" name="dbname" label="Dbname" type="text" v-model="users.dbname"></v-text-field>
                  
                
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="submit" :loading="loading">Register</v-btn>
                <v-btn block color="warning" @click="cancel" :loading="loading">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import ap from './../../api/login';
import Route from './../../router';

export default {
  data () {
    return {
      loading: false,
      status: {
        registering: ''
      },
      users: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        dbname: '',
        password: '',
        cfpassword: ''
      }
    };
  },
  methods: {
    submit () {
      ap.register(this.users).then((result) => {
        
        Route.replace('/login');
      }).catch((err) => { 
        console.log(err);
      });
    },
    cancel () {
      this.users.username = '';
      this.users.firstname = '';
      this.users.lastname = '';
      this.users.email = '';
      this.users.dbname = '';
      this.users.password = '';
      this.users.cfpassword = '';
    }
  }
};
</script>