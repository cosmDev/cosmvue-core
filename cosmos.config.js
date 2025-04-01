export default [
  {
    chainId: "cosmoshub-4",
    name: "Atom",
    desc: "Cosmos is an ever-expanding ecosystem of interoperable and sovereign blockchain apps and services, built for a decentralized future.",
    slot: "atom",
    mode: "mainnet",
    apiURL: "https://cosmoshub.lava.build:443",
    rpcURL: "https://rpc-cosmoshub.ecostake.com",
    coinLookup: {
      viewDenom: "ATOM",
      chainDenom: "uatom",
      addressPrefix: "cosmos",
      icon: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
      banner:
        "https://pbs.twimg.com/profile_banners/1019126440233615361/1684483223/1500x500",
    },
    feeMultiplier: 1.3,
    gasPrice: 0.025,
    explorerUrl: "https://www.mintscan.io/cosmos/txs/",
    coingeckoId: "cosmos",
    color: "#0091EA",
    colorChart: ["#d0e4f7", "#73b1e7", "#0a77d5", "#87bcea"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    },
  },
  {
    chainId: "akashnet-2",
    name: "Akash",
    desc: "Akash is an open Supercloud network that makes it easy to rapidly scale and access services around the world.",
    slot: "akash",
    mode: "mainnet",
    apiURL: "https://rest-akash.ecostake.com",
    rpcURL: "https://rpc-akash.ecostake.com:443",
    coinLookup: {
      viewDenom: "AKT",
      chainDenom: "uakt",
      addressPrefix: "akash",
      icon: "https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.svg",
      banner:
        "https://raw.githubusercontent.com/BitCannaGlobal/cosmospay-woocommerce/main/public/img/Akash.png",
    },
    feeMultiplier: 1.3,
    gasPrice: 0.025,
    explorerUrl: "https://www.mintscan.io/cosmos/txs/",
    coingeckoId: "akash-network",
    color: "#F34C2D",
    colorChart: ["#b25747", "#F34C2D", "#ad594a", "#89584f"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    },
  },
  {
    chainId: "gitopia",
    name: "Gitopia",
    desc: "Gitopia is the next-generation Code Collaboration Platform fuelled by a decentralized network and interactive token economy.",
    slot: "gitopia",
    mode: "mainnet",
    apiURL: "https://gitopia.api.kjnodes.com",
    rpcURL: "https://gitopia.rpc.kjnodes.com",
    coinLookup: {
      viewDenom: "LORE",
      chainDenom: "ulore",
      addressPrefix: "gitopia",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/gitopia/images/gitopia.png`,
      banner: "https://i.imgur.com/RONXDnZ.png",
    },
    feeMultiplier: 1.3,
    gasPrice: 0.0016,
    color: "#562085",
    colorChart: ["#a66fd6", "#562085", "#390666", "#995803"],
    explorerUrl: "https://bigdipper.live/gitopia",
    coingeckoId: "gitopia",
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: true,
    },
  },
  {
    chainId: "chihuahua-1",
    name: "Chihuahua",
    slot: "chihuahua",
    desc: "Chihuahua is the first interoperable meme coin with a POS blockchain, making it one of the most utilized chains in the Cosmos ecosystem",
    mode: "mainnet",
    apiURL: "https://api.chihuahua.wtf",
    rpcURL: "https://rpc.chihuahua.wtf",
    //apiURL: 'https://rest.cosmos.directory/chihuahua',
    //rpcURL: 'https://rpc.cosmos.directory/chihuahua',
    coinLookup: {
      viewDenom: "HUAHUA",
      chainDenom: "uhuahua",
      addressPrefix: "chihuahua",
      icon: `https://avatars.githubusercontent.com/u/94940349?v=4`,
      banner:
        "https://raw.githubusercontent.com/BitCannaGlobal/cosmospay-woocommerce/main/public/img/Chihuahua.png",
    },
    coingeckoId: "chihuahua-token",
    feeMultiplier: 1.3,
    gasPrice: 1000,
    color: "#F0A841",
    colorChart: ["#efc283", "#F0A841", "#c67f21", "#995803"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: true,
      group: true,
    },
  },
  {
    chainId: "stargaze-1",
    name: "Stargaze",
    desc: "A Cosmos based project delivering fun art, passive rewards, and redeemable backed value to holders.",
    slot: "stargaze",
    mode: "mainnet",
    apiURL: "https://rest.stargaze-apis.com",
    rpcURL: "https://rpc.stargaze-apis.com",
    coinLookup: {
      viewDenom: "STARS",
      chainDenom: "ustars",
      addressPrefix: "stars",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.svg`,
      banner:
        "https://raw.githubusercontent.com/BitCannaGlobal/cosmospay-woocommerce/main/public/img/Stargaze.png",
    },
    feeMultiplier: 1.3,
    gasPrice: 1.1,
    coingeckoId: "stargaze",
    color: "#DB2777",
    colorChart: ["#f2bad1", "#DB2777", "#aa1455", "#7c0639"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    },
  },
  {
    chainId: "juno-1",
    name: "Juno",
    desc: "Juno is an interoperable smart contract network and a zone part of the Cosmos Network. Highly scalable, robust, secure and easy to deploy!",
    slot: "juno",
    mode: "mainnet",
    apiURL: "https://lcd-juno.itastakers.com",
    rpcURL: "https://rpc-juno.itastakers.com",
    coinLookup: {
      viewDenom: "JUNO",
      chainDenom: "ujuno",
      addressPrefix: "juno",
      icon: `https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/juno/chain.png`,
      banner: "",
    },
    coingeckoId: "akash-network",
    feeMultiplier: 1.3,
    gasPrice: 0.075,
    color: "#F34C2D",
    colorChart: ["#b25747", "#F34C2D", "#ad594a", "#89584f"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    },
  },
  {
    chainId: "teritori-1",
    name: "Teritori",
    desc: "Tori token (TORI) is the Teritoti Network’s native utility token, used as the primary means to govern, secure the blockchain.",
    slot: "teritori",
    mode: "mainnet",
    apiURL: "https://teritori-api.polkachu.com",
    rpcURL: "https://teritori-rpc.polkachu.com",
    coinLookup: {
      viewDenom: "TORI",
      chainDenom: "utori",
      addressPrefix: "tori",
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png`,
      banner: "https://i.imgur.com/qWOgkAo.png",
    },
    coingeckoId: "teritori",
    feeMultiplier: 1.3,
    gasPrice: 0.25,
    color: "#2EC4F9",
    colorChart: ["#397AFE", "#2EC4F9", "#56D7E9", "#A0FBCC"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    },
  } /* ,
  {
    chainId: 'kyve-1',
    name: 'Kyve',
    desc: 'The native utility token of the KYVE network.',
    slot: "kyve",
    mode: 'mainnet',
    apiURL: 'https://kyve-api.lavenderfive.com:443',
    rpcURL: 'https://rpc-eu-1.kyve.network',
    coinLookup: {
      viewDenom: 'KYVE',
      chainDenom: 'ukyve',
      addressPrefix: 'kyve',
      icon: `https://raw.githubusercontent.com/cosmos/chain-registry/master/kyve/images/kyve.svg`,
      banner: "https://i.imgur.com/WU97RYP.png",
    },
    coingeckoId: 'bitcanna',
    feeMultiplier: 1.3,
    gasPrice: 0.075,
    color: '#33ffc9',
    colorChart: ["#b3ffeb", "#33ffc9", "#00b383", "#004d38"],
    modules: {
      feeGrant: true,
      authz: true,
      wasm: false,
      group: false,
    }
  } */,
  {
    chainId: "neogame",
    name: "Neogame testnet",
    desc: "Neogame testnet",
    slot: "neogame",
    mode: "testnet",
    apiURL: "http://194.163.150.204:1318/",
    rpcURL: "http://194.163.150.204:26659/",
    wsURL: "",
    coinLookup: {
      viewDenom: "NEO",
      chainDenom: "uneo",
      addressPrefix: "neo",
      icon: "https://cdn-icons-png.flaticon.com/512/5930/5930147.png",
      banner:
        "https://pbs.twimg.com/profile_banners/602625556/1649007099/1500x500",
      exponent: 6,
    },
    explorerUrl: "https://www.mintscan.io/bitcanna/txs/",
    coingeckoId: "bitcanna",
    feeMultiplier: 1.6,
    gasPrice: 5000,
    color: "#D8D8D8",
  },
];
