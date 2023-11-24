export interface CoinInterface {
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  max_supply: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: string;
  productId: number;
  total_supply: number;
  total_volume: number;
  ath_date: string;
  id: string;
  imageUatl_daterl: string;
  last_updated: string;
  name: string;
  symbol: string;
  price: number;
  description: {
    en: 'string'
  },
  community_score: number,
  market_data: {
    market_cap_rank: number,
    current_price: { usd: number },
    price_change_percentage_24h: number,
    low_24h: { usd: number },
    high_24h: { usd: number },
    market_cap: { usd: number },
    total_supply: number,
    max_supply: number,
    circulating_supply: number,
    ath: { usd: number }
  },
  links: {
    homepage: string[],
    subreddit_url: string,
    facebook_username: string,
    repos_url: { github: string }
  }
  image: { small: string },
  watchlist_portfolio_users: string,
}
