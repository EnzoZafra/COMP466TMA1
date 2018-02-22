<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="resume">
    <html>
      <body>
        <h1>Lorenzo Zafra's Resume</h1>

        <table>
          <tr>
            <td><xsl:value-of select="information/name/lastname"/>_<xsl:value-of select="information/name/lastname"/></td>
          </tr>
          <tr>
            <td><xsl:value-of select="information/contact/email"/></td>
            <td><xsl:value-of select="information/contact/phone"/></td>
            <td><xsl:value-of select="information/contact/website"/></td>
          </tr>
          <tr>
            <td><xsl:value-of select="information/address/street"/></td>
            <td><xsl:value-of select="information/address/postalcode"/></td>
            <td><xsl:value-of select="information/address/province"/></td>
            <td><xsl:value-of select="information/address/country"/></td>
          </tr>
        </table>

        <table>
          <xsl:for-each select="education/degrees">
            <tr>
              <td><xsl:value-of select="degree/university"/></td>
              <td><xsl:value-of select="degree/major"/></td>
              <td><xsl:value-of select="degree/year"/></td>
              <td><xsl:value-of select="degree/GPA"/></td>
            </tr>
            <tr>
              <td>Date</td>
              <td><xsl:value-of select="degree/startdate"/></td>
              <td><xsl:value-of select="degree/enddate"/></td>
            </tr>
          </xsl:for-each>
        </table>

        <table>
          <xsl:for-each select="workexperience/workterm">
            <tr>
              <td><xsl:value-of select="company"/></td>
              <td><xsl:value-of select="position"/></td>
              <td><xsl:value-of select="jobdescription"/></td>
            </tr>
            <tr>
              <td>Start Date:</td>
              <td><xsl:value-of select="period/startdate/month"/></td>
              <td><xsl:value-of select="period/startdate/year"/></td>
            </tr>
            <tr>
              <td>End Date:</td>
              <td><xsl:value-of select="period/enddate/month"/></td>
              <td><xsl:value-of select="period/enddate/year"/></td>
            </tr>
          </xsl:for-each>
        </table>


      </body>
    </html>

  </xsl:template>

</xsl:stylesheet>
