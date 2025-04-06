export const getQuestionByGemini = async(history) => {
    const res = await fetch("https://vercel.com/yuji1123-hyogos-projects/backend/api/question",{
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
    const res = await fetch("https://vercel.com/yuji1123-hyogos-projects/backend/api/reaction",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify( item ),
    });if (!res.ok){
        throw new Error("Geminiとの連携に失敗しました");
    }
    const data = await res.json();
    return data;
};