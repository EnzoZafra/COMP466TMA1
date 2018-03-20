<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>
            <xsl:value-of select="/resume/information/name"/>
        </title>
      </head>
      <body>
        <h1>
          <xsl:value-of select="/resume/information/name"/>
        </h1>
        <ul>
          <li>Website: <xsl:value-of select="/resume/information/contact/website"/></li>
          <li>Telephone: <xsl:value-of select="/resume/information/contact/phone"/></li>
          <li>Email: <xsl:value-of select="/resume/information/contact/email"/></li>
          <li>
            Address: <xsl:value-of select="/resume/information/address/street"/><xsl:text> </xsl:text>
            <xsl:value-of select="/resume/information/address/postalcode"/><xsl:text> </xsl:text>
            <xsl:value-of select="/resume/information/address/province"/><xsl:text> </xsl:text>
            <xsl:value-of select="/resume/information/address/country"/>
          </li>
        </ul>
        <h2>Education</h2>
        <xsl:for-each select="/resume/education/degree">
          <b><xsl:value-of select="university"/></b>
          <p>
            <xsl:value-of select="major"/> -
            <xsl:value-of select="year"/>
          </p>
          <div>
            <b>GPA: </b><p><xsl:value-of select="GPA"/></p>
          </div>
          <b>Date:</b>
          <p><xsl:value-of select="startdate"/> - <xsl:value-of select="enddate"/></p>
        </xsl:for-each>

        <h2>Work Experience</h2>
        <xsl:for-each select="/resume/workexperience/workterm">
          <xsl:text>
          </xsl:text>
          <b><xsl:value-of select="company"/> - <xsl:value-of select="position"/></b>
          <p><xsl:value-of select="jobdescription"/></p>
          <p><xsl:value-of select="period/startdate/month"/><xsl:text> </xsl:text><xsl:value-of select="period/startdate/year"/> - <xsl:value-of select="period/enddate/month"/><xsl:text> </xsl:text><xsl:value-of select="period/enddate/year"/></p>
        </xsl:for-each>

      </body>
    </html>

  </xsl:template>

</xsl:stylesheet>
