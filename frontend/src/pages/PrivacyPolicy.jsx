import React from "react";
import Footer from "../components/homepage/Footer.jsx";
import Navbar from "../components/homepage/Navbar.jsx";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
    
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">
          Privacy Policy
      </p>

      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Law enforcement</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Other legal requirements</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
      <ul className="list-disc p-[revert]">
        <li>Comply with a legal obligation</li>
        <li>Protect and defend the rights or property of the Company</li>
        <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
        <li>Protect the personal safety of Users of the Service or the public</li>
        <li>Protect against legal liability</li>
      </ul>

      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Security of Your Personal Data</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Children&apos;s Privacy</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent&apos;s consent before We collect and use that information.</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Links to Other Websites</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">Changes to this Privacy Policy</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
      <p className="text-[#1B152B] text-sm flex flex-col  md:p-4  justify-center">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
  
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
