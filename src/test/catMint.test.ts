import { OriginCoin } from "@/models/wallet";
import { analyzeCatCoin } from "@/services/coin/cat";
import puzzle from "@/services/crypto/puzzle";
import utility from "@/services/crypto/utility";
import { generateMintCatBundle } from "@/services/mint/cat";
import { Instance } from "@/services/util/instance";

function xchPrefix() { return "xch"; }
function xchSymbol() { return "XCH"; }
function chainId() { return "ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb"; }

beforeAll(async () => {
  await Instance.init();
})

test('Mint Cat', async () => {
  const coin: OriginCoin = {
    "amount": 25n,
    "parent_coin_info": "0xc1f1407bec5f2c33207bf2d61321114fa7558268ddf1f0a3326fcbb6bca496be",
    "puzzle_hash": "0xd9c531638dfcd539e4f040af35157d19045c4f9f23ad3fea207b92b672925a35"
  };

  const sk_hex = "297aedaf1e5c001377aea56142b4f56b8c9f5bdc7b046b47c8609b9cbdde067e";
  const tgt_addr = "xch1qqltywgepnjekjh3u3sjjxu3sh82vttqwt7nwxq9rffslk9gyx9uqg8lqru";
  const change_addr = "xch1m8znzcudln2nne8sgzhn29taryz9cnulywknl63q0wftvu5jtg6sjp4yvm";

  const memo = "hello";
  const fee = 1n;
  const amount = 10n;
  const requests = await puzzle.getPuzzleDetails(utility.fromHexString(sk_hex), "xch", 0, 1);

  const { spendBundle, assetId } = await generateMintCatBundle(
    tgt_addr,
    change_addr,
    amount,
    fee,
    memo,
    { [xchSymbol()]: [coin] },
    sk_hex,
    [{ puzzles: requests, symbol: xchSymbol() }],
    xchSymbol(),
    chainId(),
    "cat_v1",
  );

  expect(spendBundle).toMatchSnapshot("spendbundle");
  expect(assetId).toMatchSnapshot("assetid");
});

test('Analyze Cat 1', async () => {
  const bundle =
  {
    "aggregated_signature": "",
    "coin_spends": [
      {
        "coin": {
          "amount": 391349000n,
          "parent_coin_info": "0x2e7f1caa0325f7844a4c098d7cc5a79b5dd36e29fe0eb1e6ac904d97e4f1cfa5",
          "puzzle_hash": "0x06d0fe9cf492a511e5b8179af1ec58f5af494897b59053d73196cbbe60d4340a"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a0b3867458a6af107794a09b6083e3f0f05fbece0adae328f4df9ade53a60ca1b3ffff04ffff01ff01ffff33ff80ff818fffff02ffff01ff02ffff03ff2fffff01ff0880ffff01ff02ffff03ffff09ff2dff0280ff80ffff01ff088080ff018080ff0180ffff04ffff01a02e7f1caa0325f7844a4c098d7cc5a79b5dd36e29fe0eb1e6ac904d97e4f1cfa5ff018080ff8080ffff33ffa0d87f6df7c1473f33f5abb1d42d117712d4346c4431225daf51cf4f9f8954181bff8417538308ffffa0d87f6df7c1473f33f5abb1d42d117712d4346c4431225daf51cf4f9f8954181b808080ff0180808080",
        "solution": "0xff80ff80ffa0458b72b831d6b9b71e121359ab88c097a9a69e5f8deb8d58c521d7278a411ecbffffa02e7f1caa0325f7844a4c098d7cc5a79b5dd36e29fe0eb1e6ac904d97e4f1cfa5ffa006d0fe9cf492a511e5b8179af1ec58f5af494897b59053d73196cbbe60d4340aff841753830880ffffa02e7f1caa0325f7844a4c098d7cc5a79b5dd36e29fe0eb1e6ac904d97e4f1cfa5ffa0972c1f059996722a23b289b9eade0c9a2b3a442c82418dcb5323d7996c8bf5aaff841753830880ff80ff8080"
      }
    ]
  };
  const analysis = await analyzeCatCoin(bundle.coin_spends[0].puzzle_reveal);
  expect(analysis).toMatchSnapshot("analysis");
});

test('Analyze Cat 2', async () => {
  const bundle =
  {
    "aggregated_signature": "",
    "coin_spends": [
      {
        "coin": {
          "amount": 1000,
          "parent_coin_info": "0xc68e39bfd02ba692562ac1472431c67559178a5a6d8e49f9ae474be2d6c8b7cd",
          "puzzle_hash": "0x9e44e5f30ce0eebb621b8543fc6ee42779a41aac43ff49bf955d9e908db03b86"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a0b3867458a6af107794a09b6083e3f0f05fbece0adae328f4df9ade53a60ca1b3ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b5c7539888af59f601be0ea2eddd32c06a80d932170eec55ef7a7640cbc5b37b81c4258644229eca2322298a9bf0189fff018080ff0180808080",
        "solution": "0xffff80ffff01ffff33ffa00eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155ff820258ffffa00eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155ff8568656c6c6f8080ffff33ffa03eb239190ce59b4af1e461291b9185cea62d6072fd3718051a530fd8a8218bc0ff8201908080ff8080ffffa031d21890603bd618c25e1cfbd65977e89b0124cd222196f3ace4bb5e3c6d274effa0a2fd4cc94d25821eed8dfe3840af498b32b98a84bff0f5aa5508c7924e260ddcff830186a080ffa0d749c165eb31a941369da8ba8a48b7016807891be86682ce2762bd11316cc208ffffa0c68e39bfd02ba692562ac1472431c67559178a5a6d8e49f9ae474be2d6c8b7cdffa09e44e5f30ce0eebb621b8543fc6ee42779a41aac43ff49bf955d9e908db03b86ff8203e880ffffa0c68e39bfd02ba692562ac1472431c67559178a5a6d8e49f9ae474be2d6c8b7cdffa03eb239190ce59b4af1e461291b9185cea62d6072fd3718051a530fd8a8218bc0ff8203e880ff80ff8080"
      }
    ]
  };
  const analysis = await analyzeCatCoin(bundle.coin_spends[0].puzzle_reveal);
  expect(analysis).toMatchSnapshot("analysis");
});