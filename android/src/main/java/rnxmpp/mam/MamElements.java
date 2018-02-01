package rnxmpp.mam;

import org.jivesoftware.smack.packet.DefaultExtensionElement;
import org.jivesoftware.smack.packet.ExtensionElement;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.util.StringUtils;
import org.jivesoftware.smack.util.XmlStringBuilder;
import org.jivesoftware.smackx.forward.packet.Forwarded;

/**
 * MAM elements.
 *
 * @see <a href="http://xmpp.org/extensions/xep-0313.html">XEP-0313: Message
 *      Archive Management</a>
 * @author Fernando Ramirez and Florian Schmaus
 *
 */
public class MamElements {

    public static final String NAMESPACE = "urn:xmpp:mam:0";

    /**
     * MAM result extension class.
     *
     * @see <a href="http://xmpp.org/extensions/xep-0313.html">XEP-0313: Message
     *      Archive Management</a>
     *
     */
    public static class MamResultExtension extends DefaultExtensionElement {

        /**
         * result element.
         */
        public static final String ELEMENT = "result";

        /**
         * id of the result.
         */
        private final String id;

        /**
         * the forwarded element.
         */
        private final Forwarded forwarded;

        /**
         * the query id.
         */
        private String queryId;

        /**
         * MAM result extension constructor.
         *
         * @param queryId
         * @param id
         * @param forwarded
         */
        public MamResultExtension(String queryId, String id, Forwarded forwarded) {
            super(ELEMENT,NAMESPACE);
            if (StringUtils.isEmpty(id)) {
                throw new IllegalArgumentException("id must not be null or empty");
            }
            if (forwarded == null) {
                throw new IllegalArgumentException("forwarded must no be null");
            }
            this.id = id;
            this.forwarded = forwarded;
            this.queryId = queryId;
        }

        /**
         * Get the id.
         *
         * @return the id
         */
        public String getId() {
            return id;
        }

        /**
         * Get the forwarded element.
         *
         * @return the forwarded element
         */
        public Forwarded getForwarded() {
            return forwarded;
        }

        /**
         * Get query id.
         *
         * @return the query id
         */
        public final String getQueryId() {
            return queryId;
        }

        @Override
        public String getElementName() {
            return ELEMENT;
        }

        @Override
        public final String getNamespace() {
            return NAMESPACE;
        }

        @Override
        public CharSequence toXML() {
            XmlStringBuilder xml = new XmlStringBuilder();
            xml.halfOpenElement(this);
            xml.xmlnsAttribute(NAMESPACE);
            xml.optAttribute("queryid", getQueryId());
            xml.optAttribute("id", getId());
            xml.rightAngleBracket();

            xml.element(getForwarded());

            xml.closeElement(this);
            return xml;
        }

        public static MamResultExtension from(Message message) {
            return (MamResultExtension) message.getExtension(ELEMENT, NAMESPACE);
        }

    }



}
