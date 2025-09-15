import { create } from "zustand";
import { type MarathonFormState } from "../libs/Store";
export const useMarathonFormStore = create<MarathonFormState>((set) => ({
  fname: "",
  lname: "",
  plan: "funrun",
  gender: "male",
  email: "",
  couponCode: "",
  haveCoupon: false,
  total: 0,
  setFname: (fname) =>
    set(() => ({
      fname: fname,
    })),
  setLname: (_lname) =>
    set(() => ({
      lname: _lname,
    })),
  setPlan: (_plan) =>
    set(() => ({
      plan: _plan,
    })),
  setGender: (_gender) =>
    set(() => ({
      gender: _gender,
    })),
  setEmail: (_email) =>
    set(() => ({
      email: _email,
    })),
  setCouponCode: (_couponCode) =>
    set(() => ({
      couponCode: _couponCode,
    })),
  setHaveCoupon: (v) =>
    set(() => ({
      haveCoupon: v,
    })),
  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  discountCupon: () => 
    set((state) => {
      let totalPayment = 0;
      if (state.plan === "funrun") totalPayment += 500;
      if (state.plan === "mini") totalPayment += 800;
      if (state.plan === "half") totalPayment += 1200;
      if (state.plan === "full") totalPayment += 1500;
      
      if (state.haveCoupon && state.couponCode.trim() === "CMU2025") totalPayment = totalPayment * 0.7;
      return { total: totalPayment };
    }),
  reset: () =>
    set({
      fname: "",
      lname: "",
      plan: "funrun",
      gender: "male",
      email: "",
      couponCode: "",
      haveCoupon: false,
      total: 0,
    }),
}));
