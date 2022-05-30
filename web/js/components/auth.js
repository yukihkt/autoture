const app = Vue.createApp({
    data() {
        return {
          contractExist: false,
        }
      }
});


const PORT = 8080;
//const API_URL = "";
const API_URI = "http://localhost:" + PORT;


// app.component( 'vue-recaptcha', VueRecaptcha )
const setAuthHeader = (token) => {
  if(token){
      axios.defaults.header = {
          Authorization: token,
          'Content-Type': 'Application/json'
      }
  } else {
     delete axios.defaults.headers.Authorization;
  }
}

app.component("register-form", {
  template: `
    <form @submit.prevent="handleSubmit" method="POST" :class="{mx_form: formInv}">
                    <p class="error" v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                    <div class="text-container">
                        <label for="" class="control-label">Username</label>
                        <p class="small-text">Select an username for your account, it shall be your identity</p>
                        <span><i class="fa-solid fa-user" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Username" v-model="username" :class="{mx_empty_filed: !username}" required>
                    </div>

                    <div class="text-container">
                        <label for="" class="control-label">Email</label>
                        <p class="small-text">Fill in your email so that we inform you important stuff</p>
                        <span><i class="fa-solid fa-envelope" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="email" id="email" placeholder="Email" v-model="email" :class="{mx_empty_filed: !email}" required>
                    </div>

                    <div class="text-container">
                        <label for="" class="control-label">Password</label>
                        <p class="small-text">Pick a strong password, as strong as a warlock!</p>
                        <span><i class="fa-solid fa-key" aria-hidden="true"></i></span>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="password" :class="{mx_empty_filed: !password}" v-on:keyup="checkPasswordStrength" required>
                    </div>
                 
                    <div class="g-recaptcha mt-3" data-sitekey="6LeXoCEgAAAAAAdsOZKfifLaDbwYZ7wbbrkIhW8B"></div>
                    <button type="submit" class="btn btn-warning mt-2">Continue</button>
                    <p class="small-text mt-3">Do you already have an account? <a href="login.html">Sign in</a></p>
                </form>
    `,
  data() {
    return {
      name: "john",
      username: "",
      password: "",
      email: "",
      username: "",
      usertype: "business",
      errors: [],
      formInv: false,
      recaptcha: null,
    };
  },
  methods: {
    handleSubmit() {
      this.errors = [];

      const credentials = {
        email: this.email,
        password: this.password,
        username: this.username,
        name: this.name,
        role: this.usertype,
      };

      if (!this.min8 || !this.capLetters || !this.symbolChar || !this.numChar) {
        this.errors.push(
          "Please have 8 characters, 1 capital letter and 1 symbol for your password."
        );
      }

      if (!this.validateEmail(email)) {
        this.errors.push("Please enter a valid email address.");
      }

      if (this.min8 && this.capLetters && this.symbolChar && this.numChar) {
        this.errors = [];
        axios
          .post(encodeURI(API_URI + "/auth/register"), credentials)
          .then((response) => {
            console.log(response);

            if (response.data.username === this.username) {
              window.location.replace("signup-confirmation.html");
            }

            if (response.data.body.message) {
              this.errors.push(response.data.message);
            }
          })
          .catch((err) => {
            this.errors.push(err.response.data.message);
            //console.log(err.response.data)
          });
      } else {
        this.formInv = true;
      }
    },
    validateEmail($email) {
      var pattern =
        /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return pattern.test($email);
    },
    checkPasswordStrength() {
      let lengthEight = new RegExp("(?=.{8,})");
      let oneCapitalLetter = new RegExp("(?=.*[A-Z])");
      let oneSymbol = new RegExp("(?=.*[!@#$&*])");
      let oneNumber = new RegExp("(?=.*[0-9])");

      lengthEight.test(this.password)
        ? (this.min8 = true)
        : (this.min8 = false);
      oneCapitalLetter.test(this.password)
        ? (this.capLetters = true)
        : (this.capLetters = false);
      oneSymbol.test(this.password)
        ? (this.symbolChar = true)
        : (this.symbolChar = false);
      oneNumber.test(this.password)
        ? (this.numChar = true)
        : (this.numChar = false);
    },
    mxVerify(response) {
        this.recaptcha = response
    },
  },
});

app.component("login-form", {
  template: `
    <p class="error" v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                      <ul>
                          <li v-for="error in errors">{{ error }}</li>
                      </ul>
                  </p>
    <form @submit.prevent="handleLogin" method="post" :class="{mx_form: formInv}">
                    <div class="text-container">
                        <label for="" class="control-label">Username</label>
                        <span><i class="fa-solid fa-user" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="username" id="username" placeholder="Username"
                        v-model="username" required>
                    </div>


                    <div class="text-container">
                        <label for="" class="control-label">Password</label>
                        <span><i class="fa-solid fa-key" aria-hidden="true"></i></span>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password or WIF"
                        v-model="password" required>
                    </div>


                    <div class="row" style="margin-top: 0%;">
                        <div class="col md-6">
                            <p class="small-text mt-3">Don't have an account? <a href="sign-up.html">Sign up</a></p>
                        </div>
                        <div class="col md-6">
                            <button type="submit" class="btn btn-warning mt-2 float-right">Continue</button>
                        </div>
                    </div>

                </form>
    `,
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      formInv: false,
    };
  },
  methods: {
    handleLogin() {
      this.errors = [];
      const credentials = {
        username: this.username,
        password: this.password,
      };

      if (this.username && this.password) {
        axios
          .post(encodeURI(API_URI + "/auth/login"), credentials)
          .then((response) => {
            
            if (response.data.access_token) {
              sessionStorage.setItem("token", response.data.access_token);
              sessionStorage.setItem("role", response.data.role);
              sessionStorage.setItem("username", response.data.username);

              setAuthHeader(response.data.access_token);
              this.goToDashboard();
              console.log("hi")
            }

            if (response.data.message) {
              this.errors.push(response.data.message);
            }
          })
          .catch((err) => {
            this.errors.push(err);
            //console.log(err.response.data)
          });
      } else {
        this.formInv = true;
      }
    },
    goToDashboard() {
      const accountIdentity = sessionStorage.getItem("role");
      console.log(accountIdentity)
      if (accountIdentity == "business") {
        window.location.replace("client.html");
      } 
    },
  },
});

app.component("confirmation-form", {
  template: `
  
    <form @submit.prevent="handleLogin" method="post" :class="{mx_form: formInv}">
                    <div class="text-container">
                        <label for="" class="control-label">Your public key</label>
                        <span><i class="fa-solid fa-lock-open" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="public" id="public" placeholder="Your public key" disabled
                        v-model="public">
                    </div>


                    <div class="text-container">
                        <label for="" class="control-label">Your private key</label>
                        <span><i class="fa-solid fa-lock" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" name="private" id="private" placeholder="Your private key" disabled
                        v-model="private">
                    </div>


                    <div class="row" style="margin-top: 0%;">
                        <div class="col md-6 offset-md-6">
                            <button type="submit" class="btn btn-warning mt-2 float-right" onclick="routeToPage('login')">Continue</button>
                        </div>
                    </div>

                </form>
    `,
  data() {
    return {
      public:
        "F569A86D3C2C8D7DDA26B5DBEA20BD5C19EEB35DFC63FDB724BAC4F21C227850",
      private:
        "D7CD482CB958EF235F5D26E852472BA1EE5309EAB18E3C6712181A7BFAE80000",
      errors: [],
      formInv: false,
    };
  },
  methods: {
    goToDashboard() {
      const accountIdentity = sessionStorage.getItem("role");
      if (accountIdentity == "freelancer") {
        window.location.replace("freelancer.html");
      } else if (accountIdentity == "client") {
        window.location.replace("client");
      }
    },
  },
});

app.component("schedule-table", {
  template: `
      <!-- Autoture table -->
      <div class="row">
          <table class="table table-borderless text-center" v-show="isContractExist">
              <thead>
                  <tr>
                      <th scope="col">Stage</th>
                      <th scope="col">Description</th>
                      <th scope="col">Value (ETH)</th>
                      <th scope="col">State</th>
                      <th scope="col">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(each_schedule, i) in schedules" :key="1">
                      <th scope="row">{{i+1}}</th>
                      <td>{{each_schedule.description}}</td>
                      <td>{{each_schedule.value}}</td>
                      <td><span class="badge badge-primary state-badge">{{each_schedule.state}}</span></td>
                      <td>
                          <button class="btn btn-primary" @click="" v-show="isAction">{{each_schedule.action}}</button>
                          <!-- <div class="spinner-border spinner-border-sm text-light ml-3" role="status"> -->
                          <!-- <span class="sr-only">Loading...</span></div> -->
                      </td>
  
                  </tr>
              </tbody>
          </table>
      </div>
  
  
      <!-- Modal -->
      <div class="modal fade" id="scheduleModal" tabindex="-1" role="dialog" aria-labelledby="scheduleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="scheduleModalLabel">New Schedule</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <form>
                      <div class="modal-body">
                          <div class="form-group">
                              <label for="contract-description"
                                  class="col-form-label text-dark">Description</label>
                              <input type="text" class="form-control" id="contract-description"
                                  v-model="description" placeholder="Enter Schedule Description" required>
                          </div>
                          <div class="form-group">
                              <label for="message-text" class="col-form-label text-dark">Value:</label>
                              <input type="number" step="any" min="0" class="form-control" id="contract-value"
                                  v-model="value" placeholder="Enter Value to Fund" required>
                          </div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" @click="addSchedule" class="btn btn-primary">Add
                              Schedule</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  
      `,
  data() {
    return {
      // data_base should be updated via axios method
      idForSchedule: 3,
      description: "",
      value: "",
      state: "Planned",
      action: "Fund",
      schedules: [],
    };
  },
  computed: {
    remain() {
      return this.schedules.filter(schedules.action == "Fund").length;
    },
    anyRemaining() {
      return this.remain != 0;
    },
    contractValue() {
        value = 0
        for (let i = 0; i < schedules.length; i++) {
            value += schedules[i].value
        }
        return value
    },
    isContractExist() {
      const address = sessionStorage.getItem('contractAddress')
      if (address != null && address.length > 10) { 
        return true 
      }
      return false
    },
    isAction() {
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();
      const projectState = sessionStorage.getItem('projectState')
      for (let i = 0; i < this.schedules.length; i++) {

        if (currentPage == "freelancer.html" && this.schedules[i].state == "Planned") {
          // false
        }

        if (currentPage == "freelancer.html" && this.schedules[i].state == "Released") {
          // false
        }

        if (currentPage == "freelancer.html" && this.schedules[i].state == "Funded") {
          // true
          for (let i = 0; i < this.schedules.length; i++) {
            if (this.schedules[i].state == "Funded") {
              this.schedules[i].action = "Start Schedule"
            }
          }
          return true
        }

        if (currentPage == "client.html" && this.schedules[i].state == "Started") {
          // true
        }

        if (currentPage == "freelancer.html" && this.schedules[i].state == "Approved") {
          // true
        }


      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    addSchedule() {
      if (this.description.trim().length == 0) {
        return;
      }

      this.schedules.push({
        description: this.description,
        value: this.value,
        state: this.state,
        action: this.action,
      });

      sessionStorage.setItem("allSchedules", JSON.stringify(this.schedules))

      this.description = "";
      this.value = "";
    },
    scheduleActions(currentAction) {
      if (currentAction == "Fund") {
      } else if (currentAction == "Start Schedule") {
      } else if (currentAction == "Approve") {
      } else if (currentAction == "Release Funds") {
      }
    },
  },
    created() {
      const schedules = sessionStorage.getItem("allSchedules")
      var totalContractValue = 0
      if (schedules != null) {
        this.schedules = JSON.parse(schedules);
      }

      for (let i = 0; i < this.schedules.length; i++) {
        totalContractValue += this.schedules[i].value
      }

      sessionStorage.setItem("contractValue", totalContractValue);
      //sessionStorage.setItem("disbursedValue", this.disbursedValue)

    }
});

app.component("account-details", {
  template: `
      <div class="card autocard" v-show="isContractExist">
      <div class="card-body">
          <div class="card-details">
              <p class="box-title">Contract Address</p>
              <p class="box-description">{{this.contractAddress}}</p>
          </div>
          <div class="card-details freelancer-wallet">
              <p class="box-title">Freelancer Wallet</p>
              <p class="box-description">{{this.freelancerAddress}}</p>
          </div>
          <div class="card-details client-wallet">
              <p class="box-title">Client Wallet</p>
              <p class="box-description">{{this.clientAddress}}</p>
          </div>
          <div class="card-details">
              <p class="box-title">Project Stage & State</p>
              <p class="box-description">
                  <span class="badge badge-initiated">
                  {{this.contractState}}
                  </span>
              </p>
          </div>
      </div>
  </div>
  <div id="card-buttons" v-show="isContractExist">
      <button type="button" class="btn btn-primary font-weight-bold" data-toggle="modal"
          data-target="#scheduleModal" v-show="scheduleButton">Add Schedule</button>
      <button type="button" class="btn btn-dark font-weight-bold ml-3" v-show="endProjectButton" @click="ePButton">End Project</button>
      <button type="button" class="btn btn-success font-weight-bold ml-3" v-show="acceptProjectButton" @click="acceptButton">Accept Project</button>
        <button type="button" class="btn btn-light font-weight-bold ml-3" @click="refreshButton">Refresh</button>
  </div>
  
      `,
  data() {
    return {
      contractAddress: "XXXXXXXXXXXXXXXX",
      freelancerAddress: "XXXXXXXXXXXXXXXX",
      clientAddress: "XXXXXXXXXXXXXXXX",
      contractState: "Initiated",
    };
  },
  computed: {
  
    isContractExist() {
      const address = sessionStorage.getItem('contractAddress')
      const cwallet = sessionStorage.getItem('clientWallet')
      const fwallet = sessionStorage.getItem('freelancerWallet')
      const projectState = sessionStorage.getItem('projectState')
      if (address != null && address.length > 10) { 
        this.contractAddress = address
        this.freelancerAddress = fwallet
        this.clientAddress = cwallet
        this.contractState = projectState
        return true 
      }
      return false
    }, scheduleButton() {
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();

      if (currentPage == 'freelancer.html') {
        if (this.contractState == 'Initiated') {
          return true
        }
        return false
      } 
    }, endProjectButton() {
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();

      if (currentPage == 'freelancer.html') {
        if (this.contractState == 'Accepted') {
          return true
        }
        return false
      } 
    }, acceptProjectButton() {
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();

      if (currentPage == 'client.html') {
        if (this.contractState == 'Initiated') {
          return true
        }
        return false
      }
    } 
  },
  methods: {
    refreshButton() {
    document.location.reload()
  }, acceptButton() {
    sessionStorage.setItem("projectState", "Accepted")
    document.location.reload()
  }, ePButton() {
    sessionStorage.setItem("projectState", "End Project")
    document.location.reload()
  }
}
});

app.component("wallet-details", {
  template: `
      <div class="card autocard" v-show="isContractExist">
      <div class="card-body text-center">
          <h5 class="card-title">Total Contract Value (ETH)</h5>
          <p class="card-title h2">{{this.contractValue}}</p>
      </div>
  </div>
  <div class="card autocard mt-3" v-show="isContractExist">
      <div class="card-body text-center">
          <h5 class="card-title">Disbursed Value (ETH)</h5>
          <p class="card-title h2">{{this.disbursedValue}}</p>
      </div>
  </div>
    
        `,
  data() {
    return {
      // data_base should be updated via axios method
      contractValue: 0,
      disbursedValue: 0,
    };
  },
  computed: {
    isContractExist() {
      const address = sessionStorage.getItem('contractAddress')
      if (address != null && address.length > 10) { 
        this.contractValue = sessionStorage.getItem('contractValue');
        this.disbursedValue = sessionStorage.getItem('disbursedValue');
        return true 
      }
      return false
    }
  },
  methods: {}
});


app.component("search-contracts", {
    template: `
    <div class="col-md-12 text-center">
        <p class="title-2">Smart Contracts for <span class="badge badge-warning">{{this.role}}</span> </p>
    </div>
    <div class="col-md-12 text-center col-md-offset-6">
        <div class="input-group mt-2 form-2">
            <input type="text" class="form-control w-50"
                :placeholder="this.contractPlaceholder" v-model="contractAddress">
        </div>
    </div>
    <div class="col-md-12 text-center mt-3">
        <button class="search_btn" @click="findContract">{{this.search_txt}}</button>
    </div>
      
          `,
    data() {
      return {
        // data_base should be updated via axios method
        contractaddress: '',
        role: 'Freelancer',
        search_txt: 'Go',
        contractPlaceholder: 'Enter contract address or leave blank to deploy a new one',
        freelancerAddress: 'DA26B5DBEA20BD5',
        clientAddress: '235F5D26E852472E',
        contractValue: 0,
        disbursedValue: 0,
        projectState: 'Initiated'
      };
    },
    computed: {},
    methods: {
        findContract() {
            sessionStorage.clear()

            this.errors = [];
            const contract = {
              contractAddress: this.contractAddress
            };

            sessionStorage.setItem("contractAddress", this.contractAddress);
            sessionStorage.setItem("freelancerWallet", this.freelancerAddress);
            sessionStorage.setItem("clientWallet", this.clientAddress)
            sessionStorage.setItem("contractValue", this.contractValue);
            sessionStorage.setItem("disbursedValue", this.disbursedValue)
            sessionStorage.setItem("projectState", this.projectState)
            sessionStorage.setItem("allSchedules", [])
            document.location.reload()
            
          },
    },
    created() {
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();
      if (currentPage == "client.html") {
        this.role = 'Client'
        this.search_txt = "Search"
        this.contractPlaceholder = 'Find contract address'
      } else {
        this.role = 'Freelancer'
        this.search_txt = "Go"
        this.contractPlaceholder = 'Enter contract address or leave blank to deploy a new one'
      }
    }
});
  

app.mount("#app");
