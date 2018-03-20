<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- <xsl:output method="html" indent="yes"/> -->
  <xsl:template match="/">
    <html>
      <body>
        <xsl:for-each select="/notes/note">
          <h5><xsl:value-of select="topic"></xsl:value-of></h5>
          <hr></hr>
          <ul>
            <xsl:for-each select="data">
              <li>
                <xsl:value-of select="."></xsl:value-of>
              </li>
            </xsl:for-each>
          </ul>
        </xsl:for-each>
      </body>
    </html>

  </xsl:template>

</xsl:stylesheet>
