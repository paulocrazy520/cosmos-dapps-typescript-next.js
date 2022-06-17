import { olloKeplrChainInfo } from "@/config/ollo";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { endpoints } from "..";
import { defaultOlloGas, getStargateKeplr } from "./tx";
// export { ChainInfoWithExplorer } from '../../stores/chain'

import { ChainInfos } from "../../config/chain-infos";

export * from "./user";
export * from "./gov";
export * from "./stake";
export * from "./bank";
export * from "./pool";
export * from "./auth";
export * from "./tx";
// import * from './ons'

// import fetch from '@vercel/fetch'
import axios from "axios";
// import store from '@/store'
// import compareVersions from 'compare-versions'
// import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { fromHex, toBase64 } from "@cosmjs/encoding";
// import {
//   Proposal, ProposalTally, Proposer, StakingPool, Votes, Deposit,
//   Validator, StakingParameters, Block, ValidatorDistribution, StakingDelegation, WrapStdTx, getUserCurrency,
// } from './utils'
// import OsmosAPI from './osmos'
// static fetch()
export function commonProcess(res) {
  if (res && Object.keys(res).includes("result")) {
    return res.result;
  }
  return res;
}

export function keybase(identity) {
  return fetch(
    `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`
  ).then((res) => res.json());
}

export default class ChainFetch {
  //   constructor(chainId?: string) {
  //     // this.osmosis = new OsmosAPI()
  //     if (config) {
  //         this.config = config
  //     } else {
  //         this.config = ChainInfos.find(c => c.chainId == "ollo-testnet-1")
  //     }
  //     this.EndpointVersion = {
  //       certik: 'v1alpha1',
  //     }
  //   }
  //   getEndpointVersion() {
  //     return this.EndpointVersion[this.config.chainName] || 'v1beta1'
  //   }
  //   getSelectedConfig() {
  //     let chain = store.state.chains.selected
  //     const lschains = localStorage.getItem('chains')
  //     if (lschains) {
  //       chain = JSON.parse(lschains)[chain?.chainName || 'cosmos']
  //     }
  //     if (!chain.sdk_version) {
  //       chain.sdk_version = '0.33'
  //     }
  //     this.config = chain
  //     return this.config
  //   }
  //   isModuleLoaded(name) {
  //     // if (this.config.unload_module) {
  //     //   return !this.config.unload_module.includes(name)
  //     // }
  //     return true
  //   }
  //   async getNodeInfo() {
  //     return get('/cosmos/base/tendermint/v1beta1/node_info')
  //   }
  //   async getLatestBlock(config = null) {
  //     // const conf = config || getSelectedConfig()
  //     // const ver = conf.sdk_version || '0.41'
  //     // if (ver && compareVersions(ver, '0.45') < 1) {
  //     //   return get('/blocks/latest', config).then(data => Block.create(data)).then(block => {
  //     //     block.block.last_commit.signatures.map(s1 => {
  //     //       const s = s1
  //     //       s.validator_address = toBase64(fromHex(s.validator_address))
  //     //       return s
  //     //     })
  //     //     return block
  //     //   })
  //     // }
  //     return get('/cosmos/base/tendermint/v1beta1/blocks/latest', config).then(data => Block.create(data))
  //   }
  //   async getBlockByHeight(height, config = null) {
  //     // const conf = config || getSelectedConfig()
  //     // const ver = conf.sdk_version || '0.41'
  //     // if (ver && compareVersions(ver, '0.45') < 1) {
  //     //   return get('/blocks/latest', config).then(data => Block.create(data)).then(block => {
  //     //     block.block.last_commit.signatures.map(s1 => {
  //     //       const s = s1
  //     //       s.validator_address = toBase64(fromHex(s.validator_address))
  //     //       return s
  //     //     })
  //     //     return block
  //     //   })
  //     // }
  //     return get(`/cosmos/base/tendermint/v1beta1/blocks/${height}`, config).then(data => Block.create(data))
  //   }
  //   async getSlashingSigningInfo(config = null) {
  //     return this.get('/cosmos/slashing/v1beta1/signing_infos?pagination.limit=500', config)
  //   }
  //   async getTxs(hash, config = null) {
  //     // const conf = config || this.getSelectedConfig()
  //     // const ver = conf.sdk_version || '0.41'
  //     // /cosmos/tx/v1beta1/txs/{hash}
  //     // if (ver && compareVersions(ver, '0.40') < 1) {
  //     //   return this.get(`/txs/${hash}`).then(data => WrapStdTx.create(data, ver))
  //     // }
  //     return this.get(`/cosmos/tx/v1beta1/txs/${hash}`).then(data => WrapStdTx.create(data, ver))
  //   }
  //   async getTxsBySender(sender) {
  //     return this.get(`/cosmos/tx/v1beta1/txs?events=message.sender='${sender}'&pagination.reverse=true`)
  //   }
  //   async getTxsByRecipient(recipient) {
  //     return this.get(`/cosmos/tx/v1beta1/txs?events=message.recipient='${recipient}'`)
  //   }
  //   async getTxsByHeight(height) {
  //     return this.get(`/cosmos/tx/v1beta1/txs?events=tx.height%3D${height}`)
  //   }
  // async getValidatorList(config = null) {
  // return this.get('/cosmos/staking/v1beta1/validators?pagination.limit=200&status=BOND_STATUS_BONDED', config, true).then(data => {
  //     const vals = commonProcess(data.validators).map(i => new Validator().init(i))
  //     // try {
  //     // localStorage.setItem(`validators-${this.config.chainName}`, JSON.stringify(vals))
  //     // } catch (err) {
  //     // // clear cache
  //     // for (let i = 0; i < localStorage.length; i += 1) {
  //     //     const key = localStorage.key(i)
  //     //     if (key.startsWith('validators')) {
  //     //     localStorage.removeItem(key)
  //     //     }
  //     // }
  //     // // set again
  //     // localStorage.setItem(`validators-${this.config.chainName}`, JSON.stringify(vals))
  //     // }
  //     return vals
  // })
  // }
  //   async getValidatorDistribution(address) {
  //     // return this.get(`/distribution/validators/${address}`).then(data => {
  //     //   const value = commonProcess(data)
  //     //   const ret = ValidatorDistribution.create({
  //     //     operator_address: address,
  //     //     self_bond_rewards: value.self_bond_rewards,
  //     //     val_commission: value.val_commission.commission,
  //     //   })
  //     //   return ret
  //     // })
  //     return Promise.all([
  //       this.get(`/cosmos/distribution/v1beta1/validators/${address}/commission`, null, true),
  //       this.get(`/cosmos/distribution/v1beta1/validators/${address}/outstanding_rewards`, null, true),
  //     ]).then(data => {
  //       const ret = ValidatorDistribution.create({
  //         operator_address: address,
  //         self_bond_rewards: data[2].rewards.rewards,
  //         val_commission: data[0].commission.commission,
  //       })
  //       return ret
  //     })
  //   }
  //   async getValidatorDelegations(validatorAddr) {
  //     return this.get(`/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations?pagination.imit=10000&pagination.count_total=true`)
  //       .then(data => commonProcess(data))
  //   }
  //   async getValidatorUnbondingDelegations(validatorAddr) {
  //     return this.get(`/cosmos/staking/v1beta1/validators/${validatorAddr}/unbonding_delegations`)
  //       .then(data => commonProcess(data))
  //   }
  //   async getStakingDelegatorDelegation(delegatorAddr, validatorAddr) {
  //     return this.get(`/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}`).then(data => StakingDelegation.create(commonProcess(data).delegation_response))
  //   }
  //   async getBankTotal(denom) {
  //     // if (compareVersions(this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get(`/supply/total/${denom}`).then(data => ({ amount: commonProcess(data), denom }))
  //     // }
  //     // if (compareVersions(this.config.sdk_version, '0.46') > 0) {
  //       return this.get(`/cosmos/bank/v1beta1/supply/by_denom?denom=${denom}`).then(data => commonProcess(data).amount)
  //     // }
  //     // return this.get(`/cosmos/bank/v1beta1/supply/${denom}`).then(data => commonProcess(data).amount)
  //   }
  //   async getBankTotals() {
  //     // if (compareVersions(this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get('/supply/total').then(data => commonProcess(data))
  //     // }
  //     return this.get('/cosmos/bank/v1beta1/supply').then(data => data.supply)
  //   }
  //   async getStakingPool() {
  //     return this.get('/cosmos/staking/v1beta1/pool', null, true).then(data => new StakingPool().init(commonProcess(data.pool)))
  //   }
  //   async getNfts() {
  //     return this.get('/cosmos/nft/v1beta1/nfts').then(data => new StakingPool().init(commonProcess(data.nfts)))
  //   }
  //   async getNftClasses() {
  //     return this.get('/cosmos/nft/v1beta1/classes').then(data => new StakingPool().init(commonProcess(data.classes)))
  //   }
  //   async getAuthzGrants() {
  //     return this.get('/cosmos/authz/v1beta1/grants').then(data => new StakingPool().init(commonProcess(data.grants)))
  //   }
  //   async getMintingInflation() {
  //     // if (this.config.chain_name === 'evmos') {
  //     //   return this.get('/evmos/inflation/v1/inflation_rate').then(data => Number(data.inflation_rate / 100 || 0))
  //     // }
  //     // if (this.config.chain_name === 'echelon') {
  //     //   return this.get('/echelon/inflation/v1/inflation_rate').then(data => Number(data.inflation_rate / 100 || 0))
  //     // }
  //     if (this.isModuleLoaded('minting')) {
  //       return this.get('/cosmos/mint/v1beta1/inflation').then(data => Number(commonProcess(data.inflation)))
  //     }
  //     return 0
  //   }
  //   async getStakingParameters() {
  //     return this.get('/cosmos/staking/v1beta1/params', null, true).then(data => {
  //       this.getSelectedConfig()
  //       return StakingParameters.create(commonProcess(data.params), this.config.chain_name)
  //     })
  //   }
  // async getValidatorUnbondedList() {
  // return this.get('/cosmos/staking/v1beta1/validators?pagination.limit=100&status=BOND_STATUS_UNBONDED', null, true).then(data => {
  //     const result = commonProcess(data.validators)
  //     const vals = result.validators ? result.validators : result
  //     return vals.map(i => new Validator().init(i))
  // })
  // }
  // async getValidatorListByStatus(status) {
  // return this.get(`/cosmos/staking/v1beta1/validators?status=${status}&pagination.limit=500`, null, true).then(data => {
  //     const result = commonProcess(data)
  //     const vals = result.validators ? result.validators : result
  //     return vals.map(i => new Validator().init(i))
  // })
  // }
  // async getValidatorListByHeight(height, offset) {
  // return this.get(`/cosmos/base/tendermint/v1beta1/validatorsets/${height}?pagination.limit=100&pagination.offset=${offset}`).then(data => commonProcess(data))
  // }
  // async getValidator(address) {
  // return this.get(`/cosmos/staking/v1beta1/validators/${address}`, null, true).then(data => new Validator().init(commonProcess(data).validator))
  // }
  // async getParamsSubspaces() {
  // if (this.isModuleLoaded('params')) {
  //     return this.get('/cosmos/params/v1beta1/subspaces').then(data => commonProcess(data.subspaces))
  // }
  // return null
  // }
  // async getModuleAccounts() {
  // return this.get('/cosmos/auth/v1beta1/module_accounts').then(data => data)
  // }
  // async getBankParams() {
  // return this.get('/cosmos/bank/v1beta1/params').then(data => commonProcess(data.params))
  // }
  // async getAuthParameters() {
  // return this.get('/cosmos/auth/v1beta1/params').then(data => commonProcess(data.params))
  // }
  // async getParamsParameters() {
  // return this.get('/cosmos/params/v1beta1/params').then(data => commonProcess(data.params))
  // }
  // async getSlashingParameters() {
  // if (this.isModuleLoaded('slashing')) {
  //     return this.get('/cosmos/slashing/v1beta1/params').then(data => commonProcess(data.params))
  // }
  // return null
  // }
  // async getMintParameters() {
  // if (this.isModuleLoaded('minting')) {
  //     return this.get('/cosmos/mint/v1beta1/params').then(data => commonProcess(data.params))
  // }
  // return null
  // }
  // async getDistributionParameters() {
  // return this.get('/cosmos/distribution/v1beta1/params', null, true).then(data => commonProcess(data.params))
  // }
  // async getGovernanceParameterDeposit() {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/params/deposit`).then(data => commonProcess(data.deposit_params))
  // }
  // async getGovernanceParameterTallying() {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/params/tallying`).then(data => commonProcess(data.tally_params))
  // }
  // async getGovernanceParameterVoting() {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/params/voting`).then(data => commonProcess(data.voting_params))
  // }
  // async getGovernanceTally(pid, total, conf) {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/proposals/${pid}/tally`, conf).then(data => new ProposalTally().init(commonProcess(data).tally, total))
  // }
  // async getGovernance(pid) {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/proposals/${pid}`).then(data => {
  //     const p = new Proposal().init(commonProcess(data).proposal, 0)
  //     p.versionFixed(this.config.sdk_version)
  //     return p
  // })
  // }
  // async getGovernanceProposer(pid) {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/proposals/${pid}/proposer`).then(data => new Proposer().init(commonProcess(data)))
  // }
  // async getGovernanceDeposits(pid) {
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/proposals/${pid}/deposits`).then(data => {
  //     const result = commonProcess(data)
  //     return Array.isArray(result) ? result.reverse().map(d => new Deposit().init(d)) : result
  // })
  // }
  // async getGovernanceVotes(pid, next = '', limit = 50) {
  // const ver = 'v1'
  // return this.get(`/cosmos/gov/${ver}/proposals/${pid}/votes?pagination.key=${encodeURIComponent(next)}&pagination.limit=${limit}&pagination.reverse=true`)
  // }
  // async getGovernanceListByStatus(status, chain = null) {
  // // const conf = chain || this.config
  // // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  // const url = `/cosmos/gov/${ver}/proposals?pagination.limit=100&proposal_status=${status}`
  // return this.get(url, conf).then(data => {
  //     let proposals = commonProcess(data)
  //     if (Array.isArray(proposals.proposals)) {
  //     proposals = proposals.proposals
  //     }
  //     // const ret = []
  //     // if (proposals) {
  //     // proposals.forEach(e => {
  //     //     const g = new Proposal().init(e, 0)
  //     //     // g.versionFixed(this.config.sdk_version)
  //     //     ret.push(g)
  //     // })
  //     // }
  //     return {
  //         proposals,
  //         pagination: data.pagination,
  //     }
  // })
  // }
  // // }
  //   async getGovernanceList(next = '', chain = null) {
  //     // const ver = compareVersions(this.config.sdk_version, '0.46.5') < 0 ? 'v1beta1' : 'v1'
  // const ver = 'v1'
  //     const key = next || ''
  //     const url =
  //        `/cosmos/gov/${ver}/proposals?pagination.limit=20&pagination.reverse=true&pagination.key=${key}`
  //     return this.get(url, chain).then(data => {
  //       let proposals = commonProcess(data)
  //       if (Array.isArray(proposals.proposals)) {
  //         proposals = proposals.proposals
  //       }
  //     //   const ret = []
  //     //   if (proposals) {
  //     //     proposals.forEach(e => {
  //     //       const g = new Proposal().init(e, 0)
  //     //       g.versionFixed(this.config.sdk_version)
  //     //       ret.push(g)
  //     //     })
  //     //   }
  //       return {
  //         proposals,
  //         pagination: data.pagination,
  //       }
  //     })
  //   }
  //   async getAuthAccount(address, config = null) {
  //     return this.get('/cosmos/auth/v1beta1/accounts/'.concat(address), config).then(data => {
  //       const result = commonProcess(data)
  //       return result
  //     })
  //   }
  //   async getBankAccountBalance(address) {
  //     return this.get('/cosmos/bank/v1beta1/balances/'.concat(address)).then(data => commonProcess(data).balances)
  //   }
  //   async getStakingReward(address, config = null) {
  //     // if (compareVersions(config ? config.sdk_version : this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get(`/cosmos/distribution/v1beta1/delegators/${address}/rewards`, config).then(data => commonProcess(data))
  //     // }
  //     return this.get(`/cosmos/distribution/v1beta1/delegators/${address}/rewards`, config, true).then(data => commonProcess(data))
  //   }
  //   async getValidatorSlashs(address, config = null) {
  //     return this.get(`/cosmos/distribution/v1beta1/validators/${address}/slashes`, config, true).then(data => commonProcess(data))
  //   }
  //   async getStakingValidators(address) {
  //     return this.get(`/cosmos/distribution/v1beta1/delegators/${address}/validators?pagination.size=200`, null, true).then(data => commonProcess(data.validators))
  //   }
  //   async getStakingDelegations(address, config = null) {
  //     // if (compareVersions(config ? config.sdk_version : this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get(`/staking/delegators/${address}/delegations`, config, true).then(data => commonProcess(data).map(x => {
  //     //     const xh = x
  //     //     if (!xh.delegation) {
  //     //       xh.delegation = {
  //     //         validator_address: x.validator_address,
  //     //         delegator_address: x.delegator_address,
  //     //       }
  //     //     }
  //     //     return xh
  //     //   }))
  //     // }
  //     return this.get(`/cosmos/staking/v1beta1/delegations/${address}`, config, true).then(data => commonProcess(data))
  //   }
  //   async getStakingRedelegations(address, config = null) {
  //     // if (compareVersions(config ? config.sdk_version : this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get(`/staking/redelegations?delegator=${address}`, config).then(data => commonProcess(data))
  //     // }
  //     return this.get(`/cosmos/staking/v1beta1/delegators/${address}/redelegations`, config, true).then(data => commonProcess(data))
  //   }
  //   async getStakingUnbonding(address, config = null) {
  //     // if (compareVersions(config ? config.sdk_version : this.config.sdk_version, '0.40') < 0) {
  //     //   return this.get(`/staking/delegators/${address}/unbonding_delegations`, config).then(data => commonProcess(data))
  //     // }
  //     return this.get(`/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`, config, true).then(data => commonProcess(data))
  //   }
  //   async getBankBalances(address, config = null) {
  //     return this.get('/cosmos/bank/v1beta1/balances/'.concat(address), config).then(data => commonProcess(data))
  //   }
  //   async getCommunityPool(config = null) {
  //     return this.get('/cosmos/distribution/v1beta1/community_pool', config, true).then(data => commonProcess(data))
  //   }
  //   async getAllIBCDenoms(config = null) {
  //     const conf = config || this.getSelectedConfig()
  //     // const sdkVersion = conf.sdk_version
  //     // if (compareVersions(sdkVersion, '0.44.2') < 0) {
  //     //   return this.get('/ibc/applications/transfer/v1beta1/denom_traces?pagination.limit=500', conf).then(data => commonProcess(data))
  //     // }
  //     return this.get('/ibc/apps/transfer/v1/denom_traces?pagination.limit=500', conf).then(data => commonProcess(data))
  //   }
  //   async getIBCDenomTrace(hash, config = null) {
  //     const h = hash.substring(hash.indexOf('/') + 1)
  //     const sdkVersion = config ? config.sdk_version : this.config.sdk_version
  //     if (compareVersions(sdkVersion, '0.44.2') < 0) {
  //       return this.get('/ibc/applications/transfer/v1beta1/denom_traces/'.concat(h), config).then(data => commonProcess(data))
  //     }
  //     return this.get('/ibc/apps/transfer/v1/denom_traces/'.concat(h), config).then(data => commonProcess(data))
  //   }
  //   async getIBCChannels(config = null, key = null) {
  //     if (key) {
  //       return this.get('/ibc/core/channel/v1/channels?pagination.key='.concat(key), config).then(data => commonProcess(data))
  //     }
  //     return this.get('/ibc/core/channel/v1/channels?pagination.limit=1000', config).then(data => commonProcess(data))
  //   }
  //   // eslint-disable-next-line camelcase
  //   async getIBCChannelClientState(channel_id, port_id, config = null) {
  //     // eslint-disable-next-line camelcase
  //     return this.get(`/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}/client_state`, config).then(data => commonProcess(data))
  //   }
  //   // eslint-disable-next-line camelcase
  //   async getIBCChannel(channel_id, port_id, config = null) {
  //     // eslint-disable-next-line camelcase
  //     return this.get(`/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}`, config).then(data => commonProcess(data))
  //   }
  //   static async getBankBalance(baseurl, address) {
  //     return ChainFetch.fetch(baseurl, '/cosmos/bank/v1beta1/balances/'.concat(address)).then(data => commonProcess(data))
  //   }
  //   async getGravityPools() {
  //     return this.get('/cosmos/liquidity/v1beta1/pools').then(data => commonProcess(data))
  //   }
  //   async getMarketChart(days = 14, coin = null) {
  //     const conf = this.getSelectedConfig()
  //     const currency = getUserCurrency()
  //     if (conf.assets[0] && conf.assets[0].coingecko_id) {
  //       return ChainFetch.fetch(' https://api.coingecko.com', `/api/v3/coins/${coin || conf.assets[0].coingecko_id}/market_chart?vs_currency=${currency}&days=${days}`)
  //     }
  //     return null
  //   }
  //   async getCoinInfo(coin = null) {
  //     const conf = this.getSelectedConfig()
  //     if (conf.assets[0] && conf.assets[0].coingecko_id) {
  //       return ChainFetch.fetch(' https://api.coingecko.com', `/api/v3/coins/${coin || conf.assets[0].coingecko_id}`)
  //     }
  //     return null
  //   }
  //   // CoinMarketCap
  //   async fetchCoinMarketCap(url) {
  //     const host = 'https://price.ping.pub'
  //     return fetch(host + url).then(response => response.json())
  //   }
  //   async fetchTokenQuote(symbol) {
  //     return ChainFetch.fetchCoinMarketCap(`/quote/${symbol}`)
  //   }
  //   // Simulate Execution of tx
  //   async simulate(bodyBytes, config = null) {
  //     const txString = toBase64(TxRaw.encode(bodyBytes).finish())
  //     const txRaw = {
  //       tx_bytes: txString,
  //     }
  //     return post('/cosmos/tx/v1beta1/simulate', txRaw, config)
  //   }
  //   // Tx Submit
  //   async broadcastTx(bodyBytes, config = null) {
  //     const txbytes = bodyBytes.authInfoBytes ? TxRaw.encode(bodyBytes).finish() : bodyBytes
  //     const txString = toBase64(txbytes)
  //     const txRaw = {
  //       tx_bytes: txString,
  //       mode: 'BROADCAST_MODE_SYNC', // BROADCAST_MODE_SYNC, BROADCAST_MODE_BLOCK, BROADCAST_MODE_ASYNC
  //     }
  //     return post('/cosmos/tx/v1beta1/txs', txRaw, config).then(res => {
  //       if (res.code && res.code !== 0) {
  //         throw new Error(res.message)
  //       }
  //       if (res.tx_response && res.tx_response.code !== 0) {
  //         throw new Error(res.tx_response.raw_log)
  //       }
  //       return res
  //     })
  //   }
  //   async post(url = '', data = {}, config = null) {
  //     if (!config) {
  //       this.getSelectedConfig()
  //     }
  //     const conf = config || this.config
  //     const index = this.getApiIndex(config)
  //     // Default options are marked with *
  //     const response = await fetch((Array.isArray(conf.rest) ? conf.rest[index] : conf.rest) + url, {
  //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //       // mode: 'cors', // no-cors, *cors, same-origin
  //       // credentials: 'same-origin', // redirect: 'follow', // manual, *follow, error
  //       // referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //       headers: {
  //         'Content-Type': 'text/plain',
  //         Accept: '*/*',
  //         'Accept-Encoding': 'gzip, deflate, br',
  //       },
  //       body: JSON.stringify(data), // body data type must match "Content-Type" header
  //     })
  //     // const response = axios.post((config ? config.rest : this.config.rest) + url, data)
  //     return response.json() // parses JSON response into native JavaScript objects
  //   }
  //   async get(url, config = null, fetch_on_provider = false) {
  //     if (!config) {
  //       this.getSelectedConfig()
  //     }
  //     const conf = config || this.config
  //     if (fetch_on_provider && conf.provider_chain) {
  //       return fetch(`${conf.provider_chain.rest}${url}`).then(response => response.json())
  //     }
  //     const finalurl = (Array.isArray(conf.rest) ? conf.rest[this.getApiIndex(config)] : conf.rest) + url
  //     // finalurl = finalurl.replaceAll('v1beta1', this.getEndpointVersion())
  //     return fetch(finalurl).then(response => response.json())
  //   }
  //   getApiIndex(config = null) {
  //     const conf = config || this.config
  //     const index = Number(localStorage.getItem(`${conf.chainName}-api-index`) || 0)
  //     return index < conf.rest.length ? index : 0
  //   }
  //   async getUrl(url) {
  //     this.getSelectedConfig()
  //     return fetch(url).then(res => res.json())
  //   }
  //   static fetch(host, url) {
  //     const ret = fetch((Array.isArray(host) ? host[0] : host) + url).then(response => response.json())
  //     return ret
  //   }
}
export const calcDefaultOlloGas = defaultOlloGas;
export const getStargateFromKeplrWin = getStargateKeplr;
