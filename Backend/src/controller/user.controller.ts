import yahooFinance from "yahoo-finance2";

export const getStockQuote = async(req,res)=>{
    try {
        const stockSymbol = req.query.symbol;
        let info = await yahooFinance.quote(stockSymbol);
        if(!info) throw new Error("coudn't fetch stock info")
        res.status(200).json({info,msg:"success"})
    } catch (error) {
        console.log("getStockInfo "+error)
        res.status(500).json({info:{},msg:"Internal server error : "+error})
    }
}

export const getStockInfo = async(req,res)=>{
    try {
        const stockSymbol = req.query.symbol;
        let info = await yahooFinance.quoteSummary(stockSymbol, { modules: ['summaryDetail'] });
        if(!info) throw new Error("coudn't fetch stock info")
        res.status(200).json({info,msg:"success"})
    } catch (error) {
        console.log("getStockInfo "+error)
        res.status(500).json({info:{},msg:"Internal server error : "+error})
    }
}