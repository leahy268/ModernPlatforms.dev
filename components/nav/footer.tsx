"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import { tinaField } from "tinacms/dist/react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useLayout } from "../layout/layout-context";

const footerColor = {
  default: "bg-[#202938] text-white",
  primary: "bg-[#202938] text-white",
};

export default function Footer() {
  const { globalSettings, theme } = useLayout();
  const footer = globalSettings?.footer || {};

  const footerColorCss =
    theme?.darkMode === "primary" ? footerColor.primary : footerColor.default;
  

  return (
    <footer className={cn(footerColorCss)}> {/* Reduced padding */}
      <Container className="relative max-w-6xl mx-auto py-4" size="custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"> {/* Aligned text to top */}
          {/* Left Section (Takes Up 2 Columns, Text Aligned to Top) */}
          <div className="md:col-span-2 max-w-lg flex flex-col justify-start">
            {footer?.summary.title && (
              <h4
                data-tina-field={tinaField(footer.summary, "title")}
                className="text-2xl font-semibold title-font"
              >
                {footer.summary.title}
              </h4>
            )}
            {footer?.summary.description && (
              <p
                className="text-gray-400 text-sm"
                data-tina-field={tinaField(footer.summary, "description")}
              >
                {footer.summary.description}
              </p>
            )}
          </div>

          {/* Right Section (Social Links, Text Aligned to Top) */}
          <div className="flex flex-col justify-start">
            <h5 className="text-white font-semibold text-sm mb-3">
              Connect With Us
            </h5>
            <div className="flex space-x-4">
              {footer?.social?.github && (
                <a
                  href={footer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
              {footer?.social?.twitter && (
                <a
                  href={footer.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
              {footer?.social?.instagram && (
                <a
                  href={footer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
              {footer?.social?.linkedIn && (
                <a
                  href={footer.social.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
              {footer?.social?.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
              {footer?.social?.youtube && (
                <a
                  href={footer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-gray-400 hover:text-white h-6 w-6 transition" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-4 text-center text-gray-500 text-xs border-t border-gray-600 pt-2">
          © {new Date().getFullYear()} Modern Platforms. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
