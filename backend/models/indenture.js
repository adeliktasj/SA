const mongoose = require('mongoose')

const IndentureSchema = mongoose.Schema(
  {
    number: String,
    bankId: { type: mongoose.Types.ObjectId, ref: 'Bank', required: true },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    amount: Number,
    date: Date,
    dueDate: Date,
    interestRate: Number,
    interestAmount: Number,
    residual: Number,
    state: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Indenture', IndentureSchema)
