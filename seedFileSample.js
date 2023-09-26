{
    authorName: { type: String, required: true },
    headline: { type: String, required: true },
    article: { type: String, required: true },
    topic: { type: String, enum: ['Travel', 'Living', 'Surfing', 'Paddling', 'Snorkeling', 'Wind', 'Swimming'], required: true },
    image: { type: String, required: true },
    imageSource: '',
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    datePublished: "2022-11-01T10:00:00.000Z"
},