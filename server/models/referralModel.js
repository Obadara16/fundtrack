// Referral model
const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredEmail: {
      type: String,
      required: true,
    },
    isRewarded: {
      type: Boolean,
      default: false,
    },
    rewardAmount: {
      type: Number,
      required: true,
      default: 100,
    },
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);
