export const getQuestionByGemini = async(history) => {
    const res = await fetch("https://backend-theta-inky-62.vercel.app/api/question",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({ history }),
    });
    if (!res.ok){
        throw new Error("Geminiとの連携に失敗しました");
    }
    const data = await res.json();
    return data;
};

export const postAnswerToGemini = async(item) => {
    const res = await fetch("https://backend-theta-inky-62.vercel.app/api/reaction",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify( item ),
    });if (!res.ok){
        throw new Error("Geminiとの連携に失敗しました");
    }
    const data = await res.json();
    return data;
};