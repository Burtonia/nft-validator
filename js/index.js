class NFTValidator {
  constructor() {
    this.networks = [];
  }

  inits() {return {
    setup_network_options: () => {
      this._actions.fetch_nft_networks().then(json => {
        console.log({sno_json: json});
        this._actions.append_nft_networks(json);
      });
    }
  };}

  listeners() {return {
    select_network_option: () => {
      // Toggle The Network Options Container
      document.querySelector('#chosen-network').addEventListener('click', (e) => {
        document.querySelector('#network-options').classList.toggle('hidden');
      });

      // Select a Network Option
      document.querySelectorAll('.network-option').forEach(elem => {
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          let selected_network_markup = e.target.outerHTML.replace('network-option', '');
          let selected_network_value = e.target.dataset.value;
          let displayed_network_markup = document.querySelector('#chosen-network');
          let network_field = document.querySelector('#network');
          console.log({selected_network_markup,selected_network_value,displayed_network_markup,network_field});
          displayed_network_markup.innerHTML = "";
          network_field.value = selected_network_value;
          displayed_network_markup.insertAdjacentHTML('beforeend', selected_network_markup);
        });
      });

      // Close the Network Options Container
      document.querySelector('.close-network-options').addEventListener('click', (e) => {
        document.querySelector('#network-options').classList.add('hidden');
      });
    },
    onclick_init_nft_validator: () => {
      document.querySelector('#validate-nft').addEventListener('click', (e) => {
        this._actions.validate_nft();
      });
    }
  };}

  actions() {return {
    fetch_nft_networks: async () => {
      const fetch_nft_networks = await fetch("https://alexburton.com/dev/nft-validator/json/nft-networks.json")
        .then(res => {return res.json();})
        .then(json => {return json;});
      return fetch_nft_networks;
    },
    append_nft_networks: (json) => {
      document.querySelector('#network-options').insertAdjacentHTML('beforeend', this._templates.network_options(json));
    },
    validate_nft: () => {
      const data = {
        network: document.querySelector('#network').value,
        contract_address: document.querySelector('#contract-address').value,
        token_id: document.querySelector('#token-id').value,
      };
      console.log({data});
    }
  };}

  templates() {return {
    network_options: (json) => {
      let network_options_markup = ``;
      if(json && json.length > 0) {
        json.forEach(n => {
          //network_options_markup += `<option value="${n.slug}"><span>${n.svg}</span><span>${n.name}</span></option>`;
          network_options_markup += `<div class="network-option" data-value="${n.slug}">
                                        <div class="network-icon">${n.svg}</div>
                                        <div class="network-name">${n.name}</div>
                                     </div>`;
        });
      }
      return network_options_markup;
    }
  };}

  get _inits() {return this.inits();}
  get _listeners() {return this.listeners();}
  get _actions() {return this.actions();}
  get _templates() {return this.templates();}

  get _init() {
    Object.keys(this._inits).forEach(init => {this._inits[init]();});
    window.onload = () => {Object.keys(this._listeners).forEach(listener => {this._listeners[listener]();});};
  }
}

const nft_validator = new NFTValidator();
console.log({nft_validator});
nft_validator._init;

// Goal is to emulate this page: https://tofunft.com/tools/validator
