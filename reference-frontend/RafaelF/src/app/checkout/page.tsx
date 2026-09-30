"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FeedSidebar from "@/components/feed/FeedSidebar";
import FeedNavbar from "@/components/feed/FeedNavbar";
import Footer from "@/components/Footer";
import { CheckCircle, CreditCard, ChevronDown } from "lucide-react";

// Visa icon matching Figma Desktop-51
function VisaIcon({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Select Visa"
      className={`w-[22px] h-[18px] rounded transition-all cursor-pointer flex items-center justify-center p-0.5 ${
        isSelected
          ? "ring-2 ring-white scale-110 opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          : "opacity-40 hover:opacity-85 hover:scale-105"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 13.9714C17 14.5395 16.5501 15 15.9951 15H1.00489C0.449902 15 0 14.5395 0 13.9714V4.02859C0 3.4605 0.449902 3 1.00489 3H15.9951C16.5501 3 17 3.46053 17 4.02859V13.9714Z" fill="white"/>
        <path d="M3 9L2.71079 7.31132C2.66136 7.07844 2.5175 7.00917 2.33775 7H1.01181L1 7.07716C2.03272 7.38189 2.71604 8.11702 3 9Z" fill="#F79F1A"/>
        <path d="M9 7H7.76889L7 12H8.22907L9 7Z" fill="#059BBF"/>
        <path d="M4.76886 11.9983L7 7H5.49859L4.11064 10.4149L3.96249 9.89933C3.69042 9.27904 2.91285 8.38626 2 7.82424L3.26873 12L4.76886 11.9983Z" fill="#059BBF"/>
        <path d="M12.8058 10.3446C12.8107 9.79441 12.4542 9.3748 11.686 9.02821C11.2191 8.80435 10.9345 8.65507 10.9379 8.42791C10.9379 8.22721 11.1789 8.01163 11.7011 8.01163C12.138 8.00499 12.4526 8.09951 12.6986 8.19737L12.8192 8.25213L13 7.20236C12.7355 7.10447 12.3221 7 11.805 7C10.4877 7 9.56052 7.65676 9.55212 8.59872C9.54373 9.29528 10.215 9.68334 10.7204 9.91547C11.2392 10.1521 11.4133 10.3035 11.41 10.5158C11.4066 10.8404 10.9965 10.9884 10.6132 10.9884C10.0793 10.9884 9.79645 10.9155 9.35774 10.7344L9.18726 10.6568L9 11.7426C9.31109 11.8773 9.88678 11.9951 10.4844 12C11.8852 12 12.7957 11.3516 12.8058 10.3446Z" fill="#059BBF"/>
        <path d="M14.7552 11.2483C14.9143 11.2483 16.3356 11.25 16.5385 11.25C16.5804 11.4242 16.7081 12 16.7081 12H18L16.8724 7H15.7972C15.4633 7 15.2151 7.08905 15.0682 7.41434L13 12H14.4634C14.4633 12 14.701 11.3837 14.7552 11.2483ZM15.7097 8.82531C15.7028 8.839 15.8251 8.53594 15.8951 8.34758L15.9894 8.77904C15.9894 8.77904 16.2553 9.97433 16.3111 10.2243H15.1555C15.2709 9.93668 15.7097 8.82531 15.7097 8.82531Z" fill="#059BBF"/>
        <path d="M15.9951 3H1.00489C0.449902 3 0 3.43938 0 3.98142V5H17V3.98142C17 3.43938 16.5501 3 15.9951 3Z" fill="#059BBF"/>
        <path d="M15.9951 15H1.00489C0.449902 15 0 14.5606 0 14.0186V13H17V14.0186C17 14.5606 16.5501 15 15.9951 15Z" fill="#F79F1A"/>
        <path opacity="0.15" d="M0.831013 15.7999V4.20002C0.831013 3.53724 1.35437 3 1.99996 3H1.16883C0.523318 3 0 3.53724 0 4.20002V15.7999C0 16.4627 0.523318 17 1.16887 17H2C1.35441 17 0.831013 16.4627 0.831013 15.7999Z" fill="#202121"/>
      </svg>
    </button>
  );
}

// Mastercard icon (card 1) matching Figma Desktop-51
function MastercardIcon({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Select Mastercard"
      className={`w-[22px] h-[18px] rounded transition-all cursor-pointer flex items-center justify-center p-0.5 ${
        isSelected
          ? "ring-2 ring-white scale-110 opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          : "opacity-40 hover:opacity-85 hover:scale-105"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="18" rx="3" fill="#173A63" />
        <circle cx="7" cy="9" r="4.5" fill="#E41D2C" />
        <circle cx="11" cy="9" r="4.5" fill="#F8B02B" fillOpacity="0.85" />
      </svg>
    </button>
  );
}

// Credit Card with chip (credit-card 1) matching Figma Desktop-51
function CreditCardChipIcon({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Select Credit Card"
      className={`w-[22px] h-[18px] rounded transition-all cursor-pointer flex items-center justify-center p-0.5 ${
        isSelected
          ? "ring-2 ring-white scale-110 opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          : "opacity-40 hover:opacity-85 hover:scale-105"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5938 3H1.40625C0.630879 3 0 3.63393 0 4.41304V14.587C0 15.3661 0.630879 16 1.40625 16H16.5938C17.3691 16 18 15.3661 18 14.587V4.41304C18 3.63393 17.3691 3 16.5938 3Z" fill="#5D647F"/>
        <path d="M5.5 8H2.5C2.22384 8 2 7.77616 2 7.5V5.5C2 5.22384 2.22384 5 2.5 5H5.5C5.77616 5 6 5.22384 6 5.5V7.5C6 7.77616 5.77616 8 5.5 8Z" fill="#FFD100"/>
        <path d="M3.55556 12H2.44444C2.19897 12 2 11.8209 2 11.6V11.4C2 11.1791 2.19897 11 2.44444 11H3.55556C3.80103 11 4 11.1791 4 11.4V11.6C4 11.8209 3.80103 12 3.55556 12Z" fill="#B8BAC0"/>
        <path d="M6.55556 12H5.44444C5.19897 12 5 11.8209 5 11.6V11.4C5 11.1791 5.19897 11 5.44444 11H6.55556C6.80103 11 7 11.1791 7 11.4V11.6C7 11.8209 6.80103 12 6.55556 12Z" fill="#B8BAC0"/>
        <path d="M8.55556 12H7.44444C7.19897 12 7 11.8209 7 11.6V11.4C7 11.1791 7.19897 11 7.44444 11H8.55556C8.80103 11 9 11.1791 9 11.4V11.6C9 11.8209 8.80103 12 8.55556 12Z" fill="#B8BAC0"/>
        <path d="M11.5556 12H10.4444C10.199 12 10 11.8209 10 11.6V11.4C10 11.1791 10.199 11 10.4444 11H11.5556C11.801 11 12 11.1791 12 11.4V11.6C12 11.8209 11.801 12 11.5556 12Z" fill="#B8BAC0"/>
        <path d="M12.5 14H2.5C2.22363 14 2 13.7761 2 13.5C2 13.2239 2.22363 13 2.5 13H12.5C12.7764 13 13 13.2239 13 13.5C13 13.7761 12.7764 14 12.5 14Z" fill="#8A8895"/>
        <path d="M13.5455 14H9.45455C9.2033 14 9 13.7761 9 13.5C9 13.2239 9.2033 13 9.45455 13H13.5455C13.7967 13 14 13.2239 14 13.5C14 13.7761 13.7967 14 13.5455 14Z" fill="#8A8895"/>
        <path d="M6 6.75H3.5V6.25H6V5.75H3.5V5H3V8H3.5V7.25H6V6.75Z" fill="#FF9500"/>
        <path d="M13.5 8C14.3284 8 15 7.32843 15 6.5C15 5.67157 14.3284 5 13.5 5C12.6716 5 12 5.67157 12 6.5C12 7.32843 12.6716 8 13.5 8Z" fill="#FF4F19"/>
      </svg>
    </button>
  );
}

// Supported Countries List
const COUNTRIES = [
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Singapore",
  "United Arab Emirates",
  "Saudi Arabia",
  "Japan",
  "South Korea",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Italy",
  "Spain",
  "Brazil",
  "Malaysia",
  "Indonesia",
  "Pakistan",
  "Turkey",
  "South Africa",
  "New Zealand",
];

type CardType = "visa" | "mastercard" | "credit-card";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  // Selected Card Type state for dynamic switching
  const [selectedCardType, setSelectedCardType] = useState<CardType>("visa");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "Bangladesh",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    additionalInfo: "",
    cardNumber: "4242 5859 5684 2585",
    cardExpiry: "12/28",
    cardCvc: "123",
    nameOnCard: "Abir Hossain",
    paymentCountry: "Bangladesh",
    paymentZip: "1205",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic card selection handler
  const handleSelectCardType = (type: CardType) => {
    setSelectedCardType(type);
    if (type === "visa") {
      setFormData((prev) => ({ ...prev, cardNumber: "4242 5859 5684 2585", cardCvc: "123" }));
    } else if (type === "mastercard") {
      setFormData((prev) => ({ ...prev, cardNumber: "5555 2345 6789 0123", cardCvc: "888" }));
    } else if (type === "credit-card") {
      setFormData((prev) => ({ ...prev, cardNumber: "3782 8224 6310 0055", cardCvc: "4321" }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      // Strip non-digits and limit to 16 digits
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      // Auto-detect card brand dynamically from leading digits
      if (digits.startsWith("4")) {
        setSelectedCardType("visa");
      } else if (digits.startsWith("5") || digits.startsWith("2")) {
        setSelectedCardType("mastercard");
      } else if (digits.startsWith("3") || digits.startsWith("6")) {
        setSelectedCardType("credit-card");
      }
      setFormData((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-['Lato',sans-serif]">
      {/* Left Sidebar (Figma Desktop-51 Side Panel: 240px wide) */}
      <FeedSidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar (Figma Desktop-51 Nav: 80px high, right-aligned profile) */}
        <FeedNavbar
          showSearch={false}
          userSubtitle="abir07@gmai.com"
        />

        {/* Page Inner Container (Figma Frame 2147227640: left 264px, top 104px, width 1152px) */}
        <main className="flex-1 px-4 sm:px-6 py-6 lg:py-8 flex flex-col items-center w-full">
          {/* Main Card Container (Figma Frame 2147227653: 1152px x 1256px, rounded 16px) */}
          <div className="w-full max-w-[1152px] min-h-[1256px] rounded-2xl bg-[#2B2A7D] [background-image:linear-gradient(90deg,rgba(43,127,255,0.2)_0%,rgba(79,57,246,0.2)_100%)] p-6 sm:p-9 border border-white/20 shadow-2xl flex flex-col gap-6">
            
            {/* Header Title (Figma SVG: Billing Information - 28px Lato semibold) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <h1 className="text-2xl sm:text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
                Billing Information
              </h1>
              {plan && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/25 text-sm font-medium text-white/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Selected Plan: <strong className="capitalize text-white font-bold">{plan}</strong></span>
                </div>
              )}
            </div>

            {/* Success Toast / Notification */}
            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 animate-fade-in">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Payment & Booking Confirmed!</p>
                  <p className="text-xs text-emerald-200/90">
                    Your details and payment have been successfully processed. An invoice has been emailed to {formData.email || "abir07@gmai.com"}.
                  </p>
                </div>
              </div>
            )}

            {/* Inner Content (Figma Frame 2147227844: 1128px x 1122px, gap 24px) */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[1128px]">
              
              {/* Part 1: Personal & Billing Information (Figma Frame 1261156033: 1128px x 568px) */}
              <div className="flex flex-col gap-3.5 w-full">
                {/* Form Fields Stack (Figma Frame 1261156032: 1128px x 530px, gap 14px) */}
                <div className="flex flex-col gap-3.5 w-full">
                  
                  {/* Row 1: First Name & Last Name (Figma Frame 1261156031: 1128px x 82px, gap 24px) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {/* First Name (Figma Frame 162: 552px x 82px) */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="firstName" className="text-base font-medium text-white leading-[150%]">
                        First Name
                      </label>
                      <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Write here..."
                          className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>

                    {/* Last Name (Figma Frame 1261156029: 552px x 82px) */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="lastName" className="text-base font-medium text-white leading-[150%]">
                        Last Name
                      </label>
                      <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Write here..."
                          className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Email (Figma Frame 1261156030: 1128px x 82px, gap 24px) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {/* Phone */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="phone" className="text-base font-medium text-white leading-[150%]">
                        Phone
                      </label>
                      <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Write here..."
                          className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="email" className="text-base font-medium text-white leading-[150%]">
                        Email
                      </label>
                      <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Write here..."
                          className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Country/Region (Figma Frame 1261156027: 1128px x 82px) */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <label htmlFor="country" className="text-base font-medium text-white leading-[150%]">
                      Country/Region
                    </label>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white text-base font-medium outline-none font-['Lato',sans-serif] appearance-none cursor-pointer pr-6 [&>option]:bg-[#1E1E38] [&>option]:text-white"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-[#1E1E38] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-white/70 shrink-0 pointer-events-none absolute right-4" />
                    </div>
                  </div>

                  {/* Row 4: Address (Figma Frame 1261156028: 1128px x 82px) */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <label htmlFor="address" className="text-base font-medium text-white leading-[150%]">
                      Address
                    </label>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                  </div>

                  {/* Row 5: City, State, ZIP 3-column Inputs (Figma Frame 1261156032: 366.67px x 48px each) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        aria-label="City"
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        aria-label="State / Province"
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        aria-label="ZIP / Postal Code"
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                  </div>

                  {/* Row 6: Additional Information (Figma Frame 1261156029: 1128px x 82px) */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <label htmlFor="additionalInfo" className="text-base font-medium text-white leading-[150%]">
                      Additional Information
                    </label>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        id="additionalInfo"
                        name="additionalInfo"
                        type="text"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtitle / Trip Duration Label (Figma: 5DaysTrip - 16px Urbanist medium) */}
                <div className="w-full pt-1">
                  <span className="text-base font-medium text-[#D0D0D0] leading-[150%] font-['Urbanist',sans-serif]">
                    5DaysTrip
                  </span>
                </div>
              </div>

              {/* Part 2: Payment Method Section (Figma Frame 2147225785: 519px x 530px) */}
              <div className="flex flex-col items-start gap-[30px] w-full max-w-[519px] pt-4 border-t border-white/10">
                {/* Payment Method Subheader (Figma: 28px Lato semibold) */}
                <h2 className="text-2xl sm:text-[28px] font-semibold text-white leading-[135%] tracking-[-0.02em] font-['Lato',sans-serif]">
                  Payment Method
                </h2>

                <div className="flex flex-col items-start gap-5 w-full">
                  {/* Card Information Block (Figma Frame 2147225782: 519px x 134px) */}
                  <div className="flex flex-col items-start gap-2.5 w-full">
                    <label className="text-base font-medium text-white leading-[150%]">
                      Card Information
                    </label>

                    {/* Stacked Card Inputs (Figma Frame 2147225781: 519px x 100px) */}
                    <div className="w-full rounded-lg overflow-hidden flex flex-col border border-white/10">
                      {/* Top Row: Card Number & Card Brand Badges (Figma Frame 158: 519px x 50px) */}
                      <div className="h-[50px] bg-white/20 border-b border-[#B5C8DB]/40 px-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <CreditCard className="w-5 h-5 text-white/70 shrink-0" />
                          <input
                            name="cardNumber"
                            type="text"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="4242 5859 5684 2585"
                            className="w-full bg-transparent text-white placeholder-white/50 text-base font-normal outline-none font-['Lato',sans-serif] tracking-wider"
                          />
                        </div>

                        {/* Card brand icons (Figma Frame 1261156037: visa 1, card 1, credit-card 1) */}
                        <div className="flex items-center gap-1.5 shrink-0" title="Click to select payment card">
                          <VisaIcon
                            isSelected={selectedCardType === "visa"}
                            onClick={() => handleSelectCardType("visa")}
                          />
                          <MastercardIcon
                            isSelected={selectedCardType === "mastercard"}
                            onClick={() => handleSelectCardType("mastercard")}
                          />
                          <CreditCardChipIcon
                            isSelected={selectedCardType === "credit-card"}
                            onClick={() => handleSelectCardType("credit-card")}
                          />
                        </div>
                      </div>

                      {/* Bottom Row: MM/YY & CVC (Figma Frame 1261156032: 519px x 50px) */}
                      <div className="h-[50px] flex items-center w-full">
                        {/* MM/YY (260px) */}
                        <div className="flex-1 h-full bg-white/20 px-4 flex items-center">
                          <input
                            name="cardExpiry"
                            type="text"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full bg-transparent text-white placeholder-white/50 text-base font-normal outline-none font-['Lato',sans-serif]"
                          />
                        </div>

                        {/* CVC (259px, border-left 0.5px solid #B5C8DB) */}
                        <div className="flex-1 h-full bg-white/20 border-l border-[#B5C8DB]/40 px-4 flex items-center">
                          <input
                            name="cardCvc"
                            type="text"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="CVC"
                            maxLength={4}
                            className="w-full bg-transparent text-white placeholder-white/50 text-base font-normal outline-none font-['Lato',sans-serif]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name On Card Block (Figma Frame 1261156028: 519px x 82px) */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <label htmlFor="nameOnCard" className="text-base font-medium text-white leading-[150%]">
                      Name On Card
                    </label>
                    <div className="h-12 px-4 rounded-lg bg-white/20 flex items-center border border-transparent focus-within:border-white/40 transition-all">
                      <input
                        id="nameOnCard"
                        name="nameOnCard"
                        type="text"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        placeholder="Write here..."
                        className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                      />
                    </div>
                  </div>

                  {/* Country or Region Block (Figma Frame 1261156030: 519px x 132px) */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <label htmlFor="paymentCountry" className="text-base font-medium text-white leading-[150%]">
                      Country or region
                    </label>

                    {/* Stacked Country + Postal Group (Figma Frame 2147225781: 519px x 98px) */}
                    <div className="w-full rounded-lg overflow-hidden flex flex-col border border-white/10">
                      {/* Top Row: Country Selector with Select Dropdown (50px) */}
                      <div className="h-[50px] bg-white/20 border-b border-[#B5C8DB]/40 px-4 flex items-center justify-between relative">
                        <select
                          id="paymentCountry"
                          name="paymentCountry"
                          value={formData.paymentCountry}
                          onChange={handleInputChange}
                          className="w-full bg-transparent text-white text-base font-normal outline-none font-['Lato',sans-serif] appearance-none cursor-pointer pr-6 [&>option]:bg-[#1E1E38] [&>option]:text-white"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c} className="bg-[#1E1E38] text-white">
                              {c}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-white/70 shrink-0 pointer-events-none absolute right-4" />
                      </div>

                      {/* Bottom Row: Postal Code Input (48px) */}
                      <div className="h-12 bg-white/20 px-4 flex items-center">
                        <input
                          name="paymentZip"
                          type="text"
                          value={formData.paymentZip}
                          onChange={handleInputChange}
                          placeholder="Write here..."
                          aria-label="Postal Code"
                          className="w-full bg-transparent text-white placeholder-[#D0D0D0] text-base font-medium outline-none font-['Lato',sans-serif]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Button: Sign Up Button (Figma: 519px x 44px, gradient #2563EB -> #7A3BED -> #A842D4) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 px-4 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#7A3BED] to-[#A842D4] hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-white font-semibold text-base shadow-[0px_4px_16px_rgba(122,59,237,0.35)] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Subscription</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </main>

        {/* Full-width Curio Footer (Figma Desktop-51 Footer: 1440px x 501px) */}
        <Footer />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
