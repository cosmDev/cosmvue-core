<template>
    <div>
        <h1>Wallet Delegations</h1>
        <ul>
            <li v-for="delegation in walletDelegations" :key="delegation.id">
                {{ delegation.name }} - {{ delegation.amount }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "WalletDelegations",
    data() {
        return {
            walletDelegations: [
                { id: 1, name: "Delegation A", amount: "100 ATOM" },
                { id: 2, name: "Delegation B", amount: "200 ATOM" },
                { id: 3, name: "Delegation C", amount: "300 ATOM" },
            ],
        };
    },
};
</script>

<style scoped>
h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 0.5em 0;
}
</style>